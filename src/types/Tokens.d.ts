type OutputTransform = 'flat' | 'group' | 'array'

type TokenFrames = 'colors' | 'typography' | 'spacing'

interface TokensConfig {
  outputFilename: string
  outputTransform: OutputTransform
  tokenFrames: TokenFrame[]
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
