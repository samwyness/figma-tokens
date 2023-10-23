## [2.1.0](https://github.com/skits-lab/figma-tokens/compare/v2.0.0...v2.1.0) (2023-10-23)


### :rocket: Features

* **sync:** allow color values to be read from the direct child of a token data node ([#12](https://github.com/skits-lab/figma-tokens/issues/12)) ([4daec0f](https://github.com/skits-lab/figma-tokens/commit/4daec0fee9a2c7848bd2f3fa894a8bf9c53b9958))

## [2.0.0](https://github.com/skits-lab/figma-tokens/compare/v1.1.1...v2.0.0) (2023-09-26)


### ⚠ BREAKING CHANGES

* **sync:** get Figma file ID from environment, removes `fileId` field from yaml config (#7)

### :rocket: Features

* **sync:** get Figma file ID from environment, removes `fileId` field from yaml config ([#7](https://github.com/skits-lab/figma-tokens/issues/7)) ([ede2a92](https://github.com/skits-lab/figma-tokens/commit/ede2a9284d7387d75598ab06414f6b08814321ea))


### :vertical_traffic_light: CI

* **release:** run on release workflow on node 16.x ([#8](https://github.com/skits-lab/figma-tokens/issues/8)) ([014bbfd](https://github.com/skits-lab/figma-tokens/commit/014bbfd635c5f4cd8d51a533680b758697f2f1e8))
* **release:** use conventionalcommits preset for commit-analyzer plugin ([380c5fa](https://github.com/skits-lab/figma-tokens/commit/380c5fa4ed2a0e3d11368c3146db2f434093be87))

### [1.1.1](https://github.com/skits-lab/figma-tokens/compare/v1.1.0...v1.1.1) (2021-09-15)


### :vertical_traffic_light: CI

* **workflows:** add codeql-analysis workflow ([#3](https://github.com/skits-lab/figma-tokens/issues/3)) ([ed239e3](https://github.com/skits-lab/figma-tokens/commit/ed239e3dd7fb35c77948eae6792bbb64f7848d1d))


### :bug: Bug Fixes

* **config:** update configuration file schema to match docs ([#4](https://github.com/skits-lab/figma-tokens/issues/4)) ([1adfbcd](https://github.com/skits-lab/figma-tokens/commit/1adfbcd6571a073e1ddc13d49e68f3fb925ae69e))

## [1.1.0](https://github.com/skits-lab/figma-tokens/compare/v1.0.0...v1.1.0) (2021-09-14)

### :vertical_traffic_light: CI

- rename test workflow ([ccb8796](https://github.com/skits-lab/figma-tokens/commit/ccb8796dd5e7809bf7627fdd210709dde7626755))

### :rocket: Features

- add skits-tokens command ([c21241a](https://github.com/skits-lab/figma-tokens/commit/c21241a0d982f93251da519862a757ddf42214e2))

### :books: Documentation

- initial documentation for v1 ([658199e](https://github.com/skits-lab/figma-tokens/commit/658199ea0b6a6b97aa7dec6b4ed3c3afbfd54bf3))

# 1.0.0 (2021-09-14)

### Bug Fixes

- **ci:** fix remove dryRun from package.json ([83ead62](https://github.com/skits-lab/figma-tokens/commit/83ead62df76b012c8374a6d6aa23c63da9ea4405))

### Features

- change package name ([ab1bb85](https://github.com/skits-lab/figma-tokens/commit/ab1bb85595ecdff7eda71297b0dce4f67b03d155))
- **cli:** create cli with init and sync commands ([7aa87ee](https://github.com/skits-lab/figma-tokens/commit/7aa87ee2ab8636226b84459a5e3a9504e02c7468))
- **services:** create BoardService class ([980323e](https://github.com/skits-lab/figma-tokens/commit/980323ed7a6dde42bd18325abf5e1825c6723e38))
- **services:** create FigmaApiService class ([38236e5](https://github.com/skits-lab/figma-tokens/commit/38236e50b2a6a8b3321baa82afa5947c3e23d46c))
- **services:** create LogService class ([157d85b](https://github.com/skits-lab/figma-tokens/commit/157d85b344aee3872ba754808d7837af8963b604))
- **services:** create TokenService class ([db73f11](https://github.com/skits-lab/figma-tokens/commit/db73f11441e83d06893b12318127488b7946c418))
- **types:** define figma and token types ([74e7ff2](https://github.com/skits-lab/figma-tokens/commit/74e7ff21e764a40214da71e1fb7aeee618b96252))
- **utils:** add log message constants ([ed6ca19](https://github.com/skits-lab/figma-tokens/commit/ed6ca19954e58f86b5c69cdbdac58b40c71202d8))
- **utils:** add string and number helpers ([46754ed](https://github.com/skits-lab/figma-tokens/commit/46754edafd8b568fd56ca80831e0c93d90b09196))
- **utils:** define package constants ([bda2a4f](https://github.com/skits-lab/figma-tokens/commit/bda2a4fb0946d0a922d20f8fb1965cd8544ba830))
