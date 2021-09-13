import fs from 'fs'
import { CONFIG_FILENAME, DEFAULT_TOKENS_FILENAME } from '../utils/constants'
import { log } from './LogService'

export default class TokenService {
  config: TokensConfig
  colors: TokenData[]
  typography: TokenData[]
  spacing: TokenData[]

  constructor(config: TokensConfig) {
    this.config = config
    this.colors = []
    this.typography = []
    this.spacing = []

    this.validateConfigSchema()
  }

  /**
   * Returns an object of token categories represented as `TokenData[]`
   *
   * Example output:
   *
   * ```json
   * {
   *  // category
   *  "colors": [
   *    // TokenData
   *    {
   *      "name": "primary",
   *      "value": "#1E90FF",
   *      "groupName": "brand",
   *      "figmaVariantKey": "color"
   *    }
   *  ]
   * }
   * ```
   */
  private get categoryArrayTokens(): CategoryArrayTokens {
    return {
      colors: this.colors,
      typography: this.typography,
      spacing: this.spacing,
    }
  }

  /**
   * Returns an object of categorized tokens.
   *
   * Uses `TokenData.name` and `TokenData.value` to create a key value pair for each token
   *
   * Example output:
   *
   * ```json
   * {
   *  // category
   *  "colors": {
   *    // token
   *    "primary": "#1E90FF",
   *  },
   * }
   * ```
   */
  private get flatTokens(): FlatTokens {
    const temp: FlatTokens = {}

    Object.entries(this.categoryArrayTokens).map((item) => {
      const tokenCategory = item[0]
      const tokenData = item[1]
      temp[tokenCategory] = {}

      tokenData.map((token) => {
        temp[tokenCategory] = Object.assign({}, temp[tokenCategory], {
          ...this.buildToken(token),
        })
      })
    })

    return temp
  }

  /**
   * Returns an object of categorized tokens that are grouped using the `TokenData.groupName`
   * property as a key. If the `TokenData.groupName` property  is equal to the tokens category, no
   * grouping is used and token values are added directly under the token category key
   *
   * Uses `TokenData.name` and `TokenData.value` to create a key value pair for each token
   *
   * Example output:
   *
   * ```json
   * {
   *  // category
   *  "colors": {
   *    // group
   *    "brand": {
   *      // token
   *      "primary": "#1E90FF"
   *    },
   *  }
   * }
   * ```
   */
  private get groupTokens(): GroupTokens {
    const temp: GroupTokens = {}

    Object.entries(this.categoryArrayTokens).map((item) => {
      const tokenCategory = item[0]
      const tokenData = item[1]
      temp[tokenCategory] = {}

      tokenData.map((token) => {
        if (token.groupName && token.groupName !== tokenCategory) {
          temp[tokenCategory] = Object.assign({}, temp[tokenCategory], {
            [token.groupName]: Object.assign({}, temp[tokenCategory][token.groupName], {
              ...this.buildToken(token),
            }),
          })
        } else {
          temp[tokenCategory] = Object.assign({}, temp[tokenCategory], {
            ...this.buildToken(token),
          })
        }
      })
    })

    return temp
  }

  buildToken(tokenData: TokenData) {
    return {
      [tokenData.name]: tokenData.value,
    }
  }

  createTokensFile(outputType: OutputType = 'flat') {
    log.debug(`outputType: ${outputType}`)

    switch (outputType) {
      case 'flat':
        this.writeTokensToJSONFile(this.flatTokens)
        break
      case 'group':
        this.writeTokensToJSONFile(this.groupTokens)
        break
      case 'array':
        this.writeTokensToJSONFile(this.categoryArrayTokens)
        break
    }
  }

  private validateConfigSchema() {
    let result: string | null = null

    if (!this.config.fileId) {
      result = `key 'fileId' is missing in ${CONFIG_FILENAME}`
    } else if (typeof this.config.fileId !== 'string') {
      result = `key 'fileId' in ${CONFIG_FILENAME} must be a string`
    }

    log.debug(`Validating tokens config at '${CONFIG_FILENAME}'`)
    log.debug(`tokensConfig:`, this.config)

    if (result) {
      log.error(log.messages.invalidTokensConfig)
      throw 'Config validation failed: ' + result
    }
  }

  private writeTokensToJSONFile(tokenData: Object) {
    const fileName = `${this.config.outputFilename || DEFAULT_TOKENS_FILENAME}.json`
    const tokensJSON = JSON.stringify(tokenData, null, 2)

    fs.writeFile(fileName, tokensJSON, 'utf8', (err) => {
      if (err) throw err

      log.info(`Tokens created at ./${fileName}`)
    })
  }
}
