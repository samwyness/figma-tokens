import fs from 'fs'
import prompts, { PromptObject } from 'prompts'
import yaml from 'js-yaml'

import { CONFIG_FILENAME, DEFAULT_TOKENS_FILENAME } from '../utils/constants'
import { log } from '../services/LogService'

/**
 * Prompts:
 * 1. Figma API Token - Writes to .env
 * 2. Figma File ID
 * 3. Output filename - default: 'tokens'
 * 4. Frames - default: ['colors', 'typography', 'spacing']
 */

const questions: PromptObject[] = [
  {
    type: 'text',
    name: 'fileId',
    message: 'Figma File ID',
  },
  {
    type: 'text',
    name: 'outputFilename',
    message: 'Output filename',
    initial: DEFAULT_TOKENS_FILENAME,
  },
  {
    type: 'select',
    name: 'outputType',
    message: 'Output type',
    instructions: false,
    choices: [
      { title: 'Flat', value: 'flat' },
      { title: 'Grouped', value: 'group' },
      { title: 'Array', value: 'array' },
    ],
  },
  {
    type: 'multiselect',
    name: 'tokenFrames',
    message: 'Token frames',
    instructions: false,
    choices: [
      { title: 'Colors', value: 'colors' },
      { title: 'Typography', value: 'typography' },
      { title: 'Spacing', value: 'spacing' },
    ],
  },
]

export const init = async () => {
  log.info(`Lets configure your ${CONFIG_FILENAME} file\n`)

  const response = (await prompts(questions)) as TokensConfig
  const data = yaml.dump(response)

  // TODO: Warn user if figma-tokens.yml already exists

  fs.writeFile(CONFIG_FILENAME, data, 'utf-8', () => {
    console.log('')
    log.info(`${CONFIG_FILENAME} was created`)
  })
}
