import chalk from 'chalk'
import ColorConvert from 'color-convert'

import { TOKEN_FRAME_PREFIX } from '../utils/constants'
import { floatToRgbInt } from '../utils/numbers'
import { toCamelCase } from '../utils/strings'
import FigmaApiService from './FigmaApiService'
import { log } from './LogService'
import TokenService from './TokenService'

export default class BoardService {
  figmaApi: FigmaApiService
  tokens: TokenService
  boardDocument: FigmaNode | null

  constructor(tokensService: TokenService) {
    this.figmaApi = new FigmaApiService()
    this.tokens = tokensService
    this.boardDocument = null
  }

  private get tokensConfig() {
    return this.tokens.config
  }

  private get canvas() {
    return this.boardDocument?.children[0]
  }

  private get tokenFrames() {
    return this.canvas?.children.filter((child) => child.name.startsWith(TOKEN_FRAME_PREFIX)) || []
  }

  public async loadBoard() {
    try {
      const { data } = await this.figmaApi.getBoard()

      if (data.document) {
        log.debug(`Found Figma file - ${data.name}`)
        this.boardDocument = data.document
      } else {
        throw new Error(log.messages.noDocumentFoundInFigmaFile())
      }
    } catch (error) {
      log.error(error)
    }
  }

  public buildTokens() {
    this.tokenFrames.map((child) => {
      const nameSearch = child.name.replace(TOKEN_FRAME_PREFIX, '')

      if (this.tokensConfig.tokenFrames.includes(nameSearch)) {
        switch (nameSearch) {
          case 'colors':
            this.buildColorTokens(child.children)
            break
          case 'typography':
            this.buildTypographyTokens(child.children)
            break
          case 'spacing':
            this.buildSpacingTokens(child.children)
            break
          default:
            break
        }
      }
    })
  }

  private getNodeNameData(nodeName: string) {
    const namePropertySplit = nodeName.split('=')

    return {
      name: toCamelCase(
        (namePropertySplit.length > 1 ? namePropertySplit[1] : namePropertySplit[0]).toLowerCase()
      ),
      property: toCamelCase(
        (namePropertySplit.length > 1 ? namePropertySplit[0] : '').toLowerCase()
      ),
    }
  }

  /**
   * Builds an array of `TokenData` objects from a given Figma node.
   *
   * Each `node.type` type is handled differently. Currently supported node types are:
   *  - 'COMPONENT_SET'
   *
   * @param node - The Figma node
   * @param valueCallback - callback function that provides 'child' node where token values are read
   * from. Used to transform the token value outside the scope of this method
   *
   * e.g.
   * ```js
   *  this.buildTokenDataFromNode(node, (child) => child.absoluteBoundingBox.width)
   * ```
   *
   */
  private buildTokenDataFromNode(
    node: FigmaNode,
    valueCallback: (child: FigmaNode) => string | number
  ) {
    let tokens: TokenData[] = []
    const groupName = toCamelCase(node.name.toLowerCase())

    switch (node.type) {
      case 'COMPONENT_SET':
        node.children
          .filter((child) => child.type === 'COMPONENT')
          .map((child) => {
            const { name, property } = this.getNodeNameData(child.name)
            const value = valueCallback(child)

            tokens.push({
              name,
              value,
              groupName,
              figmaVariantKey: property,
            })
          })
        break

      case 'GROUP':
        node.children.map((child) => {
          const { name, property } = this.getNodeNameData(child.name)
          const value = valueCallback(child)

          tokens.push({
            name,
            value,
            groupName,
            figmaVariantKey: property,
          })
        })
        break

      default:
        throw new Error(log.messages.unsupportedNodeType(node.type))
    }

    return tokens
  }

  private buildColorTokens(nodes: FigmaNode[]) {
    const tokens: TokenData[] = []

    nodes.map((node) =>
      tokens.push(
        ...this.buildTokenDataFromNode(node, (child) => {
          let rgbColor = child.fills[0].color

          // Add backwards compatibility for previous versions that used a
          // RECTANGLE child node to determine the token value
          const rectangleChild = child.children.find((_child) => _child.type === 'RECTANGLE')
          if (rectangleChild) {
            rgbColor = rectangleChild.fills[0].color
          }

          return `#${ColorConvert.rgb.hex(
            floatToRgbInt(rgbColor.r),
            floatToRgbInt(rgbColor.g),
            floatToRgbInt(rgbColor.b)
          )}`
        })
      )
    )

    this.tokens.colors = tokens

    log.info(`Built ${chalk.yellow('color')} tokens`)
  }

  private buildTypographyTokens(nodes: FigmaNode[]) {
    const tokens: TokenData[] = []

    nodes.map((node) =>
      tokens.push(
        ...this.buildTokenDataFromNode(node, (child) => {
          const { fontSize } = (child.children[0] as FigmaTextNode).style
          return fontSize
        })
      )
    )

    this.tokens.typography = tokens

    log.info(`Built ${chalk.yellow('typography')} tokens`)
  }

  private buildSpacingTokens(nodes: FigmaNode[]) {
    const tokens: TokenData[] = []

    nodes.map((node) =>
      tokens.push(
        ...this.buildTokenDataFromNode(node, (child) => {
          const { absoluteBoundingBox } = child
          return absoluteBoundingBox.width
        })
      )
    )

    this.tokens.spacing = tokens

    log.info(`Built ${chalk.yellow('spacing')} tokens`)
  }
}
