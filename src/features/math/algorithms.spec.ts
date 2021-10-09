import { Dictionary } from '../../types'
import { getCycles, prune, pruneWithCycles } from './algorithms'
import { Definition, Graph, GraphNode, MathDocument, Statement } from './types'

const doc: MathDocument = {
  id: '',
  uri: '',
  access: {
    user: { read: true, write: false, append: true },
  },
}

const limitGraph = (graph: Graph): Dictionary<Definition | Statement> => {
  return Object.fromEntries(
    Object.entries(graph).map(([i, o]) => [
      i,
      {
        ...o,
        id: o.uri,
        dependencies: Object.keys(o.dependencies).sort(),
        dependents: Object.keys(o.dependents).sort(),
        document: o.document.id,
      },
    ]),
  )
}

const node: GraphNode = {
  uri: '',
  type: 'definition',
  label: { en: '' },
  description: { en: '' },
  dependents: {},
  dependencies: {},
  document: doc,
  examples: [],
  created: 0,
  updated: 0,
}

const makeTestGraph = (matrix: number[][]): Graph => {
  const graph: Graph = Object.fromEntries(
    matrix.map((el, i) => [
      i,
      {
        ...node,
        uri: String(i),
        dependencies: {} as Dictionary<GraphNode>,
        dependents: {} as Dictionary<GraphNode>,
      },
    ]),
  )
  matrix.forEach((el, i) =>
    el.forEach(link => {
      graph[i].dependencies[link] = graph[link]
      graph[link].dependents[i] = graph[i]
    }),
  )

  return graph
}

const dag = makeTestGraph([[1, 2, 3, 4], [2], [4], [4], []])
const prunedDag = makeTestGraph([[1, 3], [2], [4], [4], []])
const cycle = makeTestGraph([[1, 3], [2, 3, 4], [0], [4], []])
const prunedCycle = makeTestGraph([[1, 3], [2, 3], [0], [4], []])
const cycles = makeTestGraph([[1, 3], [2], [0], [2, 4], []])
const loops = makeTestGraph([[0, 1], [1]])
const midCycle = makeTestGraph([[1], [2, 3, 4], [0, 5, 6], [4], [], [6], []])
const prunedMidCycle = makeTestGraph([[1], [2, 3], [0, 5], [4], [], [6], []])

describe('algorithms', () => {
  describe('prune', () => {
    it('should prune a DAG', () => {
      const pruned = prune(dag)
      expect(limitGraph(pruned)).toEqual(limitGraph(prunedDag))
      //expect(pruned).toEqual(prunedDag)
      expect(true).toEqual(true)
    })
    it('should fail when graph contains cycle', () => {
      expect(() => prune(cycle)).toThrow('pruning is possible on DAG only')
    })
  })

  describe('getCycles', () => {
    it('should detect all cycles', () => {
      expect(getCycles(cycle)).toEqual([['0', '1', '2']])
      expect(getCycles(cycles)).toEqual([
        ['0', '1', '2'],
        ['0', '3', '2'],
      ])
      expect(getCycles(dag)).toEqual([])
    })

    it('should detect loops', () => {
      expect(getCycles(loops)).toEqual([['0'], ['1']])
    })
  })

  describe('pruneWithCycles', () => {
    it('should prune a directed graph (remove cycles and prune DAG) and return cycles', () => {
      const [pruned, foundCycles] = pruneWithCycles(cycle)
      expect(limitGraph(pruned)).toEqual(limitGraph(prunedCycle))
      expect(foundCycles).toEqual([['0', '1', '2']])
    })

    it('should prune DAG alone and return no cycles', () => {
      const [pruned, foundCycles] = pruneWithCycles(dag)
      expect(limitGraph(pruned)).toEqual(limitGraph(prunedDag))
      expect(foundCycles).toEqual([])
    })

    it('should prune another directed graph and return cycles', () => {
      const [pruned, foundCycles] = pruneWithCycles(midCycle)
      expect(limitGraph(pruned)).toEqual(limitGraph(prunedMidCycle))
      expect(foundCycles).toEqual([['0', '1', '2']])
    })
  })
})
