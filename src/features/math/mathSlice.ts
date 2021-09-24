import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit'
import { prune } from './algorithms'
import { RootState } from '../../app/store'
import * as api from './mathAPI'
import { Dictionary } from '../../app/types'

interface LanguageString extends Dictionary<string> {
  en: string // a default language, we always expect it to be there
  // eventually we'll generalize this
}

interface Node {
  id: string
  description: LanguageString
  label: LanguageString
  type: string
  created: number
  updated: number
  // there'll also be citation here
  // examples and proofs will probably extend this
  // and we need to figure out where to keep solid documents
}

interface DefinitionOrStatement extends Node {
  dependencies: string[]
  dependents: string[]
  examples: string[] // to be implemented
}

export interface Definition extends DefinitionOrStatement {
  type: 'definition'
}

export interface Statement extends DefinitionOrStatement {
  type: 'statement'
  proofs: string[] // to be implemented
}

export interface MathDocument {
  id: string
}

interface Entity<EntityType> {
  byId: Dictionary<EntityType>
  allIds: string[]
}

export interface MathState {
  entities: {
    node: Entity<Definition | Statement>
    document: Entity<MathDocument>
    // we'll add examples and proofs and citations here
  }
  ui: {
    highlighted: string
    selected: string
  }
  search: {
    query: string
  }
}

const initialState: MathState = {
  entities: {
    node: {
      byId: {},
      allIds: [],
    },
    document: {
      byId: {},
      allIds: [],
    },
  },
  ui: {
    highlighted: '',
    selected: '',
  },
  search: {
    query: '',
  },
}

// Thunks
export const addDocuments = createAsyncThunk(
  'math/addDocuments',
  async (webId: string) => {
    const documents = await api.findMathDocumentsOfPerson(webId)
    return documents
  },
)

export const addGraph = createAsyncThunk(
  'math/addGraph',
  async (uri: string) => {
    return await api.fetchGraph(uri)
  },
)

export const mathSlice = createSlice({
  name: 'math',
  initialState,
  reducers: {
    highlight: (state, action: PayloadAction<string>) => {
      state.ui.highlighted = action.payload
    },
    select: (state, action: PayloadAction<string>) => {
      state.ui.selected = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search.query = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addDocuments.fulfilled, (state, action) => {
        state.entities.document = {
          byId: Object.fromEntries(action.payload.map(id => [id, { id }])),
          allIds: action.payload,
        }
      })
      .addCase(addGraph.fulfilled, (state, action) => {
        const { nodes, links } = action.payload
        nodes.forEach(node => {
          state.entities.node.byId[node.id] = node
          state.entities.node.allIds.push(node.id)
        })
        links.forEach(([dependent, dependency]) => {
          state.entities.node.byId[dependent].dependencies.push(dependency)
          state.entities.node.byId[dependency].dependents.push(dependent)
        })
      })
  },
})

export const { highlight, select, setSearch } = mathSlice.actions

// Selectors
const selectGraphNodes = (state: RootState) => state.math.entities.node

interface EnrichedDefinition
  extends Omit<Definition, 'dependents' | 'dependencies' | 'id'> {
  uri: string
  dependents: Dictionary<EnrichedDefinition | EnrichedStatement>
  dependencies: Dictionary<EnrichedDefinition | EnrichedStatement>
}

interface EnrichedStatement
  extends Omit<Statement, 'dependents' | 'dependencies' | 'id'> {
  uri: string
  dependents: Dictionary<EnrichedDefinition | EnrichedStatement>
  dependencies: Dictionary<EnrichedDefinition | EnrichedStatement>
}

export type GraphNode = EnrichedDefinition | EnrichedStatement

export type Graph = Dictionary<GraphNode>

export const selectGraph = createSelector(selectGraphNodes, ({ byId }) => {
  const enrichedNodes: Graph = Object.fromEntries(
    Object.entries(byId).map(([id, { id: uri, ...node }]) => [
      id,
      {
        ...node,
        uri,
        dependencies: {},
        dependents: {},
      },
    ]),
  )

  Object.entries(enrichedNodes).forEach(([id, enrichedNode]) => {
    enrichedNode.dependencies = Object.fromEntries(
      byId[id].dependencies.map(id => [id, enrichedNodes[id]]),
    )
    enrichedNode.dependents = Object.fromEntries(
      byId[id].dependents.map(id => [id, enrichedNodes[id]]),
    )
  })

  return enrichedNodes
})

export const selectPrunedGraph = createSelector(selectGraph, graph =>
  prune(graph),
)

export const selectSearch = (state: RootState) => state.math.search.query

export const selectHighlighted = (state: RootState) => state.math.ui.highlighted
export const selectSelected = (state: RootState) => state.math.ui.selected

const selectNodeDependencies = (uri: string, graph: Graph): string[] =>
  uri ? Object.values(graph[uri]?.dependencies ?? {}).map(node => node.uri) : []

export const selectSelectedNodeDependencies = createSelector(
  selectSelected,
  selectGraph,
  selectNodeDependencies,
)

export const selectSearchResults = createSelector(
  selectSearch,
  selectGraph,
  (query: string, graph: Graph): { label: string; value: string }[] => {
    if (query.length < 2) return []
    return Object.values(graph)
      .filter(
        ({ label }) => label.en.toLowerCase().includes(query.toLowerCase()),
        //*|| uri.toLowerCase().includes(query.toLowerCase()),
      )
      .sort(
        ({ dependents: a }, { dependents: b }) =>
          Object.values(b).length - Object.values(a).length,
      )
      .map(({ uri, label: { en: label } }) => ({ value: uri, label }))
      .slice(0, 10)
  },
)

export const selectSelectedNode = createSelector(
  selectSelected,
  selectGraph,
  (uri, graph) => graph[uri],
)

export default mathSlice.reducer
