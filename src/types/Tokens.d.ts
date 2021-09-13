type OutputType = 'flat' | 'group' | 'array'

// enum TokenFrames {
//   Colors = 'colors',
//   Typography = 'typography',
//   Spacing = 'spacing',
// }

type TokenFrames = 'colors' | 'typography' | 'spacing'

interface TokensConfig {
  fileId: string
  outputFilename: string
  outputType: OutputType
  tokenFrames: TokenFrame[]
}

interface TokensConfigSchema extends TokensConfig {
  outputType: string
  tokenFrames: string[]
}

interface TokenData {
  name: string
  value: string | number
  groupName: string | null
  figmaVariantKey: string
}

type CategoryArrayTokens = {
  [key in TokenFrames]: TokenData[]
}

type FlatTokens = {
  [key in TokenFrame]: {
    [key: string]: TokenData['value']
  }
}

type GroupTokens = {
  [key in TokenFrame]: {
    [key: string]: {
      [key: string]: TokenData['value']
    }
  }
}
