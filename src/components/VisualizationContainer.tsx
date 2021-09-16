import React, { useEffect, useState, useContext } from 'react'
import Visualization from './Visualization'
import useGraph, { Graph, GraphNode } from '../hooks/graph'
import Simulation, { SimulationLinkExt } from '../simulation'
import { SimulationNode, SimulationLink } from '../simulation/types'
import { Vector } from '../helpers/draw'
import { SessionContext } from '../contexts/session'
import { Grid } from '../helpers/draw'
import { prune as pruneGraph } from '../algorithms'
import numeric from 'numeric'
import Statement from './Statement'
import Search from './Search'
// import useSimulation from '../hooks/simulation'
import { findMathDocumentsOfPerson, findFriends } from '../dataTest'
import { UrlString } from '@inrupt/solid-client'
import styled from 'styled-components'

const transform = (matrix: number[][], vector: Vector): Vector => {
  const raw = numeric.dot(
    matrix,
    numeric.transpose([[...vector, 1]]),
  ) as number[][]
  const [[x], [y]] = raw
  return [x, y]
}

const ICOutside = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  pointer-events: none;
  overflow-x: hidden;
  overflow-y: auto;
`
const ICInside = styled.div`
  pointer-events: all;
  overflow-x: auto;
  width: 100%;
`

const InfoContainer = ({ children }: { children: React.ReactNode }) => (
  <ICOutside>
    <div className="columns mr-1 mt-6">
      <div className="column is-one-quarter is-offset-three-quarters">
        <ICInside>{children}</ICInside>
      </div>
    </div>
  </ICOutside>
)

type VisualizationNode = {
  x: number
  y: number
  r: number
  uri: string
  label: string
  style: string
}

function nodeRadius(node: GraphNode) {
  let count = Object.entries(node.dependents).length ?? 0
  count = count < 1 ? 1 : count
  return count ** 0.42 * 5
}

type VisualizationLink = {
  source: VisualizationNode
  target: VisualizationNode
}

export type VisualizationGraph = {
  nodes: VisualizationNode[]
  links: VisualizationLink[]
}

interface SimulationGraph {
  nodes: SimulationNode[]
  links: SimulationLinkExt[]
}

const basicGrid: Grid = {
  origin: [0, 0],
  distance: 20,
  highlight: 5,
}

const transformGrid = (matrix: number[][], grid: Grid): Grid => {
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

const transformLayout = (
  matrix: number[][],
  graph: SimulationGraph,
  highlighted: string | undefined,
  selected: string | undefined,
  selectedDependencies: string[],
): VisualizationGraph => {
  const transformedNodesDict = Object.fromEntries(
    graph.nodes.map(node => {
      const [x, y] = transform(matrix, [node.x, node.y])
      const r = matrix[0][0] * node.r
      return [node.uri, { ...node, x, y, r, style: '' }]
    }),
  )

  if (highlighted) {
    transformedNodesDict[highlighted].style = 'accent'
  }

  if (selected) {
    transformedNodesDict[selected].style = 'focus'
  }

  selectedDependencies.forEach(
    uri => (transformedNodesDict[uri].style = 'accent'),
  )

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
    return { source, target }
  })

  return { nodes: Object.values(transformedNodesDict), links }
}

const selectNodeDependencies = (
  selectedNodeUri: string | undefined,
  graph: Graph,
): string[] => {
  if (!selectedNodeUri) return []
  return Object.values(graph[selectedNodeUri]?.dependencies ?? {}).map(
    node => node.uri,
  )
}

const VisualizationContainer: React.FC = props => {
  const [simulation] = useState(new Simulation())
  const [documents, setDocuments] = useState<UrlString[]>([
    'https://mrkvon.solidcommunity.net/public/math/index.ttl',
  ])

  const [layout, setLayout] = useState<SimulationGraph>({
    nodes: [],
    links: [],
  })

  const [search, setSearch] = useState('')

  const [highlightedNode, setHighlightedNode] = useState<string | undefined>()
  const [selectedNode, setSelectedNode] = useState<string | undefined>()

  const [info] = useContext(SessionContext)
  // abstract graph
  const graph = useGraph(documents)

  useEffect(() => {
    findMathDocumentsOfPerson(info?.webId ?? '').then(docs => {
      setDocuments(docs)
    })
    findFriends(info?.webId ?? '').then(console.log)
  }, [info])

  // transformation matrix
  const [matrix, setMatrix] = useState<number[][]>([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ])

  // initialize simulation
  useEffect(() => {
    let lastUpdate = Date.now() - 20
    simulation.start({
      nodes: [],
      links: [],
      onTick: ({ nodes, links }) => {
        const now = Date.now()
        if (now > lastUpdate + 20) {
          setLayout({ nodes: [...nodes], links: [...links] })
          lastUpdate = now
        }
      },
    })
    return () => {
      simulation.stop()
    }
  }, [simulation])

  /*/ refetch graph data when user gets logged in or out
  useEffect(() => {
    ;(async () => {
      await revalidate()
    })()
  }, [info, revalidate])
  */

  // when graph changes, update simulation
  useEffect(() => {
    let prunedOrFullGraph
    try {
      prunedOrFullGraph = pruneGraph(graph)
    } catch {
      prunedOrFullGraph = graph
    }

    const nodes = Object.values(prunedOrFullGraph).map(node => ({
      label: node.label,
      x: Math.random() * 400,
      y: Math.random() * 400,
      r: nodeRadius(node),
      uri: node.uri,
    }))

    const links = Object.values(prunedOrFullGraph).reduce(
      (nodes, { uri: source, dependencies }) => {
        Object.keys(dependencies).forEach(target =>
          nodes.push({ source, target }),
        )
        return nodes
      },
      [] as SimulationLink[],
    )

    simulation.update({ nodes, links })
  }, [graph, simulation])

  const handleTransform = (matrix: number[][]): void => {
    setMatrix(prevMatrix => numeric.dot(matrix, prevMatrix) as number[][])
  }

  const withNode = (action: (uri: string) => unknown) => {
    return (position: Vector): void => {
      // first transform to local coordinates
      const [x, y] = transform(numeric.inv(matrix), position)
      // then find the node in simulation
      action(simulation.selectNode({ x, y })?.uri)
    }
  }

  const handleHover = withNode(setHighlightedNode)
  const handleSelect = withNode(setSelectedNode)

  const selectedNodeDependencies = selectNodeDependencies(selectedNode, graph)
  // transform layout to TransformedLayout
  const transformedLayout = transformLayout(
    matrix,
    layout,
    highlightedNode,
    selectedNode,
    selectedNodeDependencies,
  )

  const grid = transformGrid(matrix, basicGrid)

  return (
    <>
      <Visualization
        graph={transformedLayout}
        grid={grid}
        onTransform={handleTransform}
        onHover={handleHover}
        onSelectNode={handleSelect}
        {...props}
      />

      <InfoContainer>
        {selectedNode ? (
          <Statement
            node={graph[selectedNode]}
            onSelectNode={uri => setSelectedNode(uri)}
          />
        ) : (
          <Search
            value={search}
            onChange={setSearch}
            options={selectSearchOptions(search, graph)}
            onSelect={setSelectedNode}
          />
        )}
      </InfoContainer>
    </>
  )
}

const selectSearchOptions = (
  query: string,
  graph: Graph,
): { label: string; value: string }[] => {
  if (query.length < 2) return []
  return Object.values(graph)
    .filter(
      ({ uri, label }) =>
        label.toLowerCase().includes(query.toLowerCase()) ||
        uri.toLowerCase().includes(query.toLowerCase()),
    )
    .sort(
      ({ dependents: a }, { dependents: b }) =>
        Object.values(b).length - Object.values(a).length,
    )
    .map(({ uri, label }) => ({ value: uri, label }))
    .slice(0, 10)
}

export default VisualizationContainer
