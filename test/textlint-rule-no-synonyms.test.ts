import TextLintTester from "textlint-tester";

const tester = new TextLintTester();
// rule
import rule from "../src/textlint-rule-no-synonyms";
// ruleName, rule, { valid, invalid }
tester.run("textlint-rule-no-synonyms", rule, {
    valid: [
        "新参入、借り入れ、問題のパスポート、マネー、雇入 片方のペアだけならOKです",
        "This is アーカイブ",
        // allowAlphabet: true
        "blogはブログです",
        // allow links
        `「[インターフェース](https://example.com)」と「[インタフェース](https://example.com)」`,
        // "allows
        {
            text: `ウェブアプリとウェブアプリケーションの違いは許容する`,
            options: {
                allows: ["ウェブアプリ"]　// <= 片方が許可されていればOK
            }
        }
    ],
    invalid: [{
        text: "サーバとサーバーの表記揺れがある",
        errors: [{
            message: "同義語である「サーバ」「サーバー」が利用されています",
            index: 4
        }]
    }, {
        text: "この雇入と雇入れの違いは難しい問題だ",
        errors: [{
            message: "同義語である「雇入」「雇入れ」が利用されています",
            index: 5
        }]
    },
        {
            text: "blogはブログです",
            options: {
                allowAlphabet: false
            },
            errors: [{
                message: "同義語である「blog」「ブログ」が利用されています",
                index: 5
            }]
        }]
});
