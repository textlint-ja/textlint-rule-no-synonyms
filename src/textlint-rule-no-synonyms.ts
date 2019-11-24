import { TextlintRuleReporter } from "@textlint/types";
import { createIndex, ItemGroup, Midashi } from "./create-index";
import { SudachiSynonyms } from "sudachi-synonyms-dictionary";

const TinySegmenter = require("tiny-segmenter");
const segmenter = new TinySegmenter(); // インスタンス生成

export interface Options {
    /**
     * 同じ語形の語の中でのアルファベットの表記揺れを許可するかどうか
     * trueの場合はカタカナとアルファベットの表記ゆれを許可します
     * Default: true
     */
    allowAlphabet?: boolean;
}


export const DefaultOptions: Required<Options> = {
    allowAlphabet: true
};

const report: TextlintRuleReporter<Options> = (context, options = {}) => {
    const allowAlphabet = options.allowAlphabet !== undefined ? options.allowAlphabet : DefaultOptions.allowAlphabet;
    const { Syntax, getSource, report, RuleError } = context;
    const usedSudachiSynonyms: Set<SudachiSynonyms> = new Set();
    const locationMap: Map<SudachiSynonyms, { index: number }> = new Map();
    const usedItemGroup: Set<ItemGroup> = new Set();
    const indexPromise = createIndex();
    const matchSegment = (segment: string, absoluteIndex: number, keyItemGroupMap: Map<Midashi, ItemGroup[]>) => {
        const itemGroups = keyItemGroupMap.get(segment);
        if (!itemGroups) {
            return;
        }
        itemGroups.forEach(itemGroup => {
            // "アーカイブ" など同じ見出しを複数回もつItemGroupがあるため、ItemGroupごとに1度のみに限定
            let midashAtOnce = false;
            itemGroup.items.forEach(item => {
                if (!midashAtOnce && item.midashi === segment) {
                    midashAtOnce = true;
                    usedSudachiSynonyms.add(item);
                    locationMap.set(item, { index: absoluteIndex });
                }
                usedItemGroup.add(itemGroup);
            });
        });
    };
    return {
        async [Syntax.Str](node) {
            const { keyItemGroupMap } = await indexPromise;
            const text = getSource(node);
            const segments: string[] = segmenter.segment(text);
            let absoluteIndex = node.range[0];
            segments.forEach((segement) => {
                matchSegment(segement, absoluteIndex, keyItemGroupMap);
                absoluteIndex += segement.length;
            });
        },
        async [Syntax.DocumentExit](node) {
            await indexPromise;
            for (const itemGroup of usedItemGroup.values()) {
                const items = itemGroup.usedItems(usedSudachiSynonyms, {
                    allowAlphabet
                });
                if (items.length >= 2) {
                    const 同義の見出しList = items.map(item => item.midashi);
                    // select last used
                    const matchSegment = locationMap.get(items[items.length - 1]);
                    const index = matchSegment ? matchSegment.index : 0;
                    const message = `同義語である「${同義の見出しList.join("」「")}」が利用されています`;
                    report(node, new RuleError(message, {
                        index
                    }));
                }
            }
        }
    };
};

export default report;
