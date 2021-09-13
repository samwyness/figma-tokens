import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'

import { CONFIG_FILENAME } from '../utils/constants'
import BoardService from '../services/BoardService'
import { log } from '../services/LogService'
import TokenService from '../services/TokenService'

// TODO: Use better logging for task - packages like 'ora' or 'listr'
export const sync = async () => {
  try {
    console.log()
    log.info(`Starting tokens sync`)

    // Read tokens config file
    // TODO: Add descriptive error log if 'CONFIG_FILENAME' does not exist
    const tokensConfig = yaml.load(fs.readFileSync(path.resolve(`./${CONFIG_FILENAME}`), 'utf8'), {
      onWarning: (exception) => log.warn(exception.message),
    }) as TokensConfig

    if (tokensConfig) {
      const tokensService = new TokenService(tokensConfig)
      const boardService = new BoardService(tokensService)

      // Sync tokens
      await boardService.loadBoard()
      boardService.buildTokens()
      boardService.tokens.createTokensFile(tokensConfig.outputType)
    } else {
      throw log.messages.tokensConfigGeneric
    }
  } catch (e) {
    log.error(e)
  }
}
