import numeric from 'numeric'
import { cycle2edges } from '../../algorithms'
import { GraphNode } from '../../types'
import { SimulationGraph } from '../simulation/types'
import { Grid, Matrix, Vector, VisualizationGraph } from '../types'

export const transform = (matrix: Matrix, vector: Vector): Vector => {
  const raw = numeric.dot(matrix, numeric.transpose([[...vector, 1]])) as Matrix
  const [[x], [y]] = raw
  return [x, y]
}

export const nodeRadius = (node: GraphNode): number => {
  let count = Object.entries(node.dependents).length ?? 0
  count = count < 1 ? 1 : count
  return count ** 0.42 * 5
}

export const basicGrid: Grid = {
  origin: [0, 0],
  distance: 20,
  highlight: 5,
}

export const transformGrid = (matrix: Matrix, grid: Grid): Grid => {
  let distance = grid.distance * matrix[0][0]
  while (distance < 20) {
    distance *= 5
  }
  return {
    origin: transform(matrix, grid.origin),
    distance,
    highlight: grid.highlight,
  }
}

export const transformLayout = (
  matrix: Matrix,
  graph: SimulationGraph,
  highlighted: string,
  selected: string,
  selectedDependencies: string[],
  cycles: string[][],
): VisualizationGraph => {
  const transformedNodesDict = Object.fromEntries(
    graph.nodes.map(node => {
      const [x, y] = transform(matrix, [node.x, node.y])
      const r = matrix[0][0] * node.r
      return [
        node.uri,
        { ...node, x, y, r, style: '' } as VisualizationGraph['nodes'][0],
      ]
    }),
  )

  selectedDependencies.forEach(
    uri => (transformedNodesDict[uri].style = 'focus2'),
  )

  if (highlighted && transformedNodesDict[highlighted]) {
    transformedNodesDict[highlighted].style = 'accent'
  }

  if (selected && transformedNodesDict[selected]) {
    transformedNodesDict[selected].style = 'focus'
  }

  // highlight cycles as errors
  // so first we collect the cycle edges
  const errorEdges = cycles.map(cycle => cycle2edges(cycle)).flat()

  const links = graph.links.map(link => {
    const sourceUri =
      typeof link.source === 'string'
        ? link.source
        : typeof link.source === 'number'
        ? graph.nodes[link.source].uri
        : link.source.uri
    const targetUri =
      typeof link.target === 'string'
        ? link.target
        : typeof link.target === 'number'
        ? graph.nodes[link.target].uri
        : link.target.uri
    const source = transformedNodesDict[sourceUri]
    const target = transformedNodesDict[targetUri]
    const style = errorEdges.some(
      ([a, b]) => a === source.uri && b === target.uri,
    )
      ? 'error'
      : ''
    return { source, target, style } as VisualizationGraph['links'][0]
  })

  return { nodes: Object.values(transformedNodesDict), links }
}
