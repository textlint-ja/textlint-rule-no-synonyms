import TextLintTester from "textlint-tester";

const tester = new TextLintTester();
// rule
import rule from "../src/textlint-rule-no-synonyms";
// ruleName, rule, { valid, invalid }
tester.run("textlint-rule-no-synonyms", rule, {
    valid: [
        "新参入、借り入れ、問題のパスポート、マネー、雇入 片方のペアだけならOKです",
        "This is アーカイブ"
    ],
    invalid: [{
        text: "この雇入と雇入れの違いは難しい問題だ",
        errors: [{
            message: "同義語である「雇入」「雇入れ」が利用されています",
            index: 5
        }]
    }]
});
