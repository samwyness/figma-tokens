type FigmaNodeType =
  | 'DOCUMENT'
  | 'CANVAS'
  | 'FRAME'
  | 'COMPONENT_SET'
  | 'COMPONENT'
  | 'VECTOR'
  | 'RECTANGLE'
  | 'TEXT'

type Paint = {
  blendMode: 'NORMAL'
  type: 'SOLID'
  color: {
    r: number
    g: number
    b: number
    a: number
  }
}

type TextStyle = {
  fontFamily: string
  fontPostScriptName: null
  fontWeight: number
  fontSize: number
  letterSpacing: number
  lineHeightPx: number
  lineHeightPercent: number
  lineHeightUnit: 'INTRINSIC_%'
}

interface FigmaNode {
  id: string
  name: string
  type: FigmaNodeType
  absoluteBoundingBox: {
    width: number
    height: number
  }
  fills: Paint[]
  children: FigmaNode[]
}

interface FigmaTextNode extends FigmaNode {
  type: 'TEXT'
  style: TextStyle
}
