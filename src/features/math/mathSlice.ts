import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../app/store'
import { Entity } from '../../types'
import { setTemporaryInfo } from '../info/infoSlice'
import { prune } from './algorithms'
import * as api from './mathAPI'
import { Definition, Graph, PartialNode, Statement } from './types'

export interface MathState {
  entities: {
    node: Entity<Definition | Statement>
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
  },
  ui: {
    highlighted: '',
    selected: '',
  },
}

// Thunks
export const addGraph = createAsyncThunk(
  'math/addGraph',
  async (uri: string) => {
    return await api.fetchGraph(uri)
  },
)

export const updateNode = createAsyncThunk<
  Definition | Statement,
  PartialNode,
  { dispatch: AppDispatch }
>(
  'math/updateNode',
  async (node: PartialNode, { dispatch }): Promise<Definition | Statement> => {
    dispatch(setTemporaryInfo({ type: 'info', message: 'saving ...' }))
    const updated = await api.updateNode(node)
    dispatch(setTemporaryInfo({ type: 'success', message: '... saved' }))
    return updated
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
      .addCase(updateNode.fulfilled, (state, action) => {
        const node = action.payload
        state.entities.node.byId[node.id].label = node.label
        state.entities.node.byId[node.id].type = node.type
        state.entities.node.byId[node.id].description = node.description
      })
  },
})

export const { highlight, select } = mathSlice.actions

// Selectors
const selectGraphNodes = (state: RootState) => state.math.entities.node

// this is a repeated code because of circular dependencies
// @TODO fix - dry (reappears in documentSlice)
const selectDocumentEntities = (state: RootState) =>
  state.document.entities.document

export const selectGraph = createSelector(
  selectGraphNodes,
  selectDocumentEntities,
  ({ byId: nodeDict }, { byId: documentDict }) => {
    const enrichedNodes: Graph = Object.fromEntries(
      Object.entries(nodeDict).map(([id, { id: uri, document, ...node }]) => [
        id,
        {
          ...node,
          uri,
          dependencies: {},
          dependents: {},
          document: documentDict[document],
        },
      ]),
    )

    Object.entries(enrichedNodes).forEach(([id, enrichedNode]) => {
      enrichedNode.dependencies = Object.fromEntries(
        nodeDict[id].dependencies.map(id => [id, enrichedNodes[id]]),
      )
      enrichedNode.dependents = Object.fromEntries(
        nodeDict[id].dependents.map(id => [id, enrichedNodes[id]]),
      )
    })

    return enrichedNodes
  },
)

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
