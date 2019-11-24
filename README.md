# @textlint-ja/textlint-rule-no-synonyms

同義語を表記ゆれをチェックするtextlintルールです。

同義語の辞書として[Sudachi 同義語辞書](https://github.com/WorksApplications/SudachiDict/blob/develop/docs/synonyms.md)を利用しています。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @textlint-ja/textlint-rule-no-synonyms

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "@textlint-ja/no-synonyms": true
    }
}
```

Via CLI

```
textlint --rule @textlint-ja/no-synonyms README.md
```

## Options

```ts
export interface Options {
    /**
     * 同じ語形の語の中でのアルファベットの表記揺れを許可するかどうか
     * trueの場合はカタカナとアルファベットの表記ゆれを許可します
     * Default: true
     */
    allowAlphabet?: boolean;
}
```

## References

- [Sudachi 同義語辞書](https://github.com/WorksApplications/SudachiDict/blob/develop/docs/synonyms.md)
- [azu/sudachi-synonyms-dictionary: Sudachi's synonyms dictionary](https://github.com/azu/sudachi-synonyms-dictionary)
- [azu/sudachi-synonyms-parser: Sudachi's synonyms dictionary parser](https://github.com/azu/sudachi-synonyms-parser)


## Changelog

See [Releases page](https://github.com/textlint-ja/textlint-rule-no-synonyms/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint-ja/textlint-rule-no-synonyms/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
