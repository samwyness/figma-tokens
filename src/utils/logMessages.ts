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
  `The Figma node type ${chalk.red(nodeType)} is not supported.`

const unsupportedNodeTypeForGroup = (nodeType: FigmaNode['type'], nodeName: string) =>
  `The 'outputTransform=group' configuration was used. However, the token element '${chalk.yellow(
    nodeName
  )}' in your Figma file has a node type of ${chalk.red(
    nodeType
  )}, which will result in the token value being flattened during output.\n\nTo ensure the correct output of your tokens you must group (ctrl/cmd + G) your elements in Figma before syncing.\n`

export const logMessages = {
  needHelpWithTokensConfig,
  tokensConfigGeneric,
  invalidTokensConfig,
  noDocumentFoundInFigmaFile,
  unsupportedNodeType,
  unsupportedNodeTypeForGroup,
}
