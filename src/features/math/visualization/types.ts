type VisualizationNode = {
  x: number
  y: number
  r: number
  uri: string
  label: string
  style: '' | 'focus' | 'focus2' | 'accent'
}

type VisualizationLink = {
  source: VisualizationNode
  target: VisualizationNode
  style: '' | 'error'
}

export type VisualizationGraph = {
  nodes: VisualizationNode[]
  links: VisualizationLink[]
}

export type Vector = [number, number]

export type Matrix = number[][]

export type Grid = {
  origin: Vector // coordinate of the origin
  distance: number // distance between lines
  highlight: number // which lines should be highlighted
}
