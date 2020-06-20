import TextLintTester from "textlint-tester";

const tester = new TextLintTester();
// rule
import rule from "../src/textlint-rule-no-synonyms";
// ruleName, rule, { valid, invalid }
tester.run("textlint-rule-no-synonyms", rule, {
    valid: [
        "新参入、借り入れ、問題のパスポート、マネー、雇入 片方のペアだけならOKです",
        "インターフェースとインターフェースは同じなのでOK",
        "This is アーカイブ",
        // allowAlphabet: true
        // item.hyoukiYure === "アルファベット表記"
        "blogはブログです",
        // allowNumber: true
        "1は数字の一種です",
        // item.ryakusyou === "略語・略称/アルファベット"
        "「データベース」「DB」",
        // allow links by default
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
            message: "同義語である「サーバ」と「サーバー」が利用されています",
            index: 4
        }]
    }, {
        text: "この雇入と雇入れの違いは難しい問題だ",
        errors: [{
            message: "同義語である「雇入」と「雇入れ」が利用されています",
            index: 5
        }]
    },
        {
            text: "blogはブログです",
            options: {
                allowAlphabet: false
            },
            errors: [{
                message: "同義語である「blog」と「ブログ」が利用されています",
                index: 5
            }]
        },
        {
            text: "1は数字の一種です",
            options: {
                allowNumber: false
            },
            errors: [{
                message: "同義語である「1」と「一」が利用されています",
                index: 5
            }]
        }]
});
