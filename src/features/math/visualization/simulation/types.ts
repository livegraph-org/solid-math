import { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force'

type Uri = string

export interface Node {
  label: string
  uri: Uri
  r: number
}

export interface Coords {
  x: number
  y: number
}

export interface SimulationNode extends Node, Coords {}

export interface SimulationLink {
  source: Uri
  target: Uri
}

export interface SimulationGraph {
  nodes: SimulationNode[]
  links: SimulationLinkExt[]
}

export interface SimulationNodeExt extends SimulationNodeDatum {
  uri: Uri
  r: number
}

export type SimulationLinkExt = SimulationLinkDatum<SimulationNodeExt>
