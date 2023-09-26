import chalk from 'chalk'

const needHelpWithTokensConfig = `if you need help creating a figma-tokens.yml, try running ${chalk.bold(
  `'sw-tokens init'`
)} in your terminal`

const tokensConfigGeneric =
  `Something went wrong when loading your your './figma-tokens.yml' file, ` +
  needHelpWithTokensConfig

const invalidTokensConfig =
  `Invalid yaml config detected, please check that your './figma-tokens.yml' is correct, ` +
  needHelpWithTokensConfig

const noDocumentFoundInFigmaFile = () => `No DOCUMENT found in Figma file`

const unsupportedNodeType = (nodeType: FigmaNode['type']) =>
  `The Figma node type '${nodeType}' is not supported. We currently support 'COMPONENT_SET' node types`

export const logMessages = {
  needHelpWithTokensConfig,
  tokensConfigGeneric,
  invalidTokensConfig,
  noDocumentFoundInFigmaFile,
  unsupportedNodeType,
}
