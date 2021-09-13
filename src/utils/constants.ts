export let DEBUG = process.env.DEBUG === 'true'
export const setDebug = (bool: boolean) => (DEBUG = bool)

export const PACKAGE_NAME = process.env.npm_package_name || ''
export const PACKAGE_VERSION = process.env.npm_package_version || ''

export const FIGMA_TOKEN = process.env.FIGMA_TOKEN

export const TOKEN_FRAME_PREFIX = '_tokens/'
export const DEFAULT_TOKENS_FILENAME = 'tokens'
export const CONFIG_FILENAME = './figma-tokens.yml'

export enum StyleTypes {
  FILL = 'FILL',
  TEXT = 'TEXT',
}
