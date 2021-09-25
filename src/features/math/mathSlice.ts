import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit'
import { prune } from './algorithms'
import { RootState } from '../../app/store'
import * as api from './mathAPI'
import { Definition, Statement, Graph, MathDocument } from './types'
import { Entity } from '../../types'

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
}

// Thunks
export const addDocuments = createAsyncThunk(
  'math/addDocuments',
  async (webId: string, { dispatch }) => {
    const documents = await api.findMathDocumentsOfPerson(webId)
    documents.forEach(doc => dispatch(addGraph(doc)))
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

export const { highlight, select } = mathSlice.actions

// Selectors
const selectGraphNodes = (state: RootState) => state.math.entities.node

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

export const selectHighlighted = (state: RootState) => state.math.ui.highlighted
export const selectSelected = (state: RootState) => state.math.ui.selected

const selectNodeDependencies = (uri: string, graph: Graph): string[] =>
  uri ? Object.values(graph[uri]?.dependencies ?? {}).map(node => node.uri) : []

export const selectSelectedNodeDependencies = createSelector(
  selectSelected,
  selectGraph,
  selectNodeDependencies,
)

export const selectSelectedNode = createSelector(
  selectSelected,
  selectGraph,
  (uri, graph) => graph[uri],
)

export default mathSlice.reducer
