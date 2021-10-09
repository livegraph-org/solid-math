import graphlib from 'graphlib'
import findCircuits from 'elementary-circuits-directed-graph'
import { Graph } from './types'
import cloneDeep from 'lodash.clonedeep'

function pruneCore(graph: graphlib.Graph) {
  if (!graphlib.alg.isAcyclic(graph)) {
    throw new Error('pruning is possible on DAG only')
  }
  const edges = graph.edges()
  edges.forEach(edge => {
    // remove edge
    graph.removeEdge(edge)
    // see if another path exists
    const paths = graphlib.alg.dijkstra(graph, edge.v)
    // if the other path doesn't exist, add the node back
    if (paths[edge.w].distance === Infinity) {
      graph.setEdge(edge)
    }
  })
  return graph
}

export const prune = (input: Graph): Graph => {
  const graph = new graphlib.Graph()

  Object.values(input).forEach(node => {
    graph.setNode(node.uri)

    Object.values(node.dependencies).forEach(dependency =>
      graph.setEdge(node.uri, dependency.uri),
    )
  })

  const output: Graph = Object.fromEntries(
    Object.entries(input).map(([uri, node]) => [
      uri,
      { ...node, dependencies: {}, dependents: {} },
    ]),
  )

  const prunedEdges = pruneCore(graph)
    .edges()
    .map(({ v: source, w: target }) => ({ source, target }))

  prunedEdges.forEach(({ source, target }) => {
    output[source].dependencies[target] = output[target]
    output[target].dependents[source] = output[source]
  })

  return output
}

// convert Graph to adjacency list, so we can feed it into the library
// elementary-circuits-directed-graph
const graph2adjacency = (graph: Graph): [AdjacencyList, string[]] => {
  const indexes = Object.keys(graph).sort()

  const adjacencyList = Array(indexes.length)
    .fill(null)
    .map(() => [] as number[])

  indexes.forEach((id, i) => {
    adjacencyList[i] = Object.keys(graph[id].dependencies).map(id2 =>
      indexes.findIndex(a => a === id2),
    )
  })

  return [adjacencyList, indexes]
}

type AdjacencyList = number[][]
type Cycle = number[]
type UriCycle = string[]

const findLoops = (adjacencyList: AdjacencyList): Cycle[] => {
  return (
    adjacencyList
      // save the index along with value
      .map((a, i) => [a, i] as [number[], number])
      // filter every adjacencyList item with loop
      .filter(([a, i]) => a.includes(i))
      // return simple loop
      .map(([, i]) => [i])
  )
}

export const getCycles = (graph: Graph): UriCycle[] => {
  // first convert graph into a simple adjacency matrix
  const [adjacencyList, indexes] = graph2adjacency(graph)

  // try to detect loops (cycles of length 1)
  // this is due to the limits of the findCyclesAdjacency, which fails to detect loops
  // https://github.com/antoinerg/elementary-circuits-directed-graph/issues/13
  // @TODO remove loop detection when the issue is fixed
  const loops = findLoops(adjacencyList)
  // get all the other loops
  const otherCycles = findCircuits(adjacencyList)
    // filter out loops, so we avoid duplicates (see the above-linked issue)
    .filter(a => a.length > 2)
    // and remove the last element of each cycle
    // because the library spits them out in the form [[0, 1, 0], [0, 1, 2, 4, 3, 0]]
    .map(cycle => cycle.slice(0, -1))

  const cycles = [...loops, ...otherCycles].map(cycle =>
    cycle.map(i => indexes[i]),
  )

  return cycles
}

export const pruneWithCycles = (graph: Graph): [Graph, UriCycle[]] => {
  // clone the graph
  graph = cloneDeep(graph)
  // first detect cycles
  const cycles = getCycles(graph)
  const edges = cycles
    // collect edges from all cycles
    .map(cycle => cycle2edges(cycle))
    .flat()
    // and filter out duplicates
    .filter(
      ([a, b], i, edges) =>
        edges.findIndex(([c, d]) => a === c && b === d) === i,
    )
  // then remove all edges that are part of cycles
  const dag = removeEdges(graph, edges)
  // then prune the remaining graph
  const prunedDag = prune(dag)
  // then add the cycles back
  const prunedGraph = addEdges(prunedDag, edges)
  // and return
  return [prunedGraph, cycles]
}

type Edge = [string, string]

export const cycle2edges = (cycle: UriCycle): Edge[] =>
  cycle.map((uri, i, cycle) => [cycle[i], cycle[(i + 1) % cycle.length]])

const removeEdges = (graph: Graph, edges: Edge[]): Graph => {
  edges.forEach(([a, b]) => {
    delete graph[a].dependencies[b]
    delete graph[b].dependents[a]
  })
  return graph
}

const addEdges = (graph: Graph, edges: Edge[]): Graph => {
  edges.forEach(([a, b]) => {
    graph[a].dependencies[b] = graph[b]
    graph[b].dependents[a] = graph[a]
  })
  return graph
}
