import {
  createAsyncThunk,
  createSelector,
  createSlice,
  isAnyOf,
  original,
  PayloadAction,
} from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../app/store'
import { Entity } from '../../types'
import { setTemporaryInfo } from '../info/infoSlice'
import { prune } from './algorithms'
import * as api from './mathAPI'
import {
  Definition,
  Graph,
  GraphNode,
  NewNode,
  PartialNode,
  Statement,
} from './types'

export interface MathState {
  entities: {
    node: Entity<Definition | Statement>
    // we'll add examples and proofs and citations here
  }
  ui: {
    highlighted: string
    selected: string
    create: boolean
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
    create: false,
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
    try {
      const updated = await api.updateNode(node)
      dispatch(setTemporaryInfo({ type: 'success', message: '... saved' }))
      return updated
    } catch (error) {
      let message = 'updating failed'
      if (error instanceof Error) {
        message += `: ${error.message}`
      }
      dispatch(setTemporaryInfo({ type: 'error', message }))
      throw error
    }
  },
)

export const createNode = createAsyncThunk<
  Definition | Statement,
  NewNode,
  { dispatch: AppDispatch }
>(
  'math/createNode',
  async (node: NewNode, { dispatch }): Promise<Definition | Statement> => {
    dispatch(setTemporaryInfo({ type: 'info', message: 'saving ...' }))
    try {
      const created = await api.createNode(node)
      dispatch(setTemporaryInfo({ type: 'success', message: '... saved' }))
      return created
    } catch (error) {
      let message = 'creating failed'
      if (error instanceof Error) {
        message += `: ${error.message}`
      }
      dispatch(setTemporaryInfo({ type: 'error', message }))
      throw error
    }
  },
)

export const deleteNode = createAsyncThunk<
  Definition | Statement,
  GraphNode,
  { dispatch: AppDispatch }
>('math/deleteNode', async (node: GraphNode, { dispatch }) => {
  dispatch(setTemporaryInfo({ type: 'info', message: 'deleting ...' }))
  try {
    await api.deleteNode(node)
    dispatch(setTemporaryInfo({ type: 'success', message: '... deleted' }))
    return {
      ...node,
      id: node.uri,
      dependencies: Object.keys(node.dependencies),
      dependents: Object.keys(node.dependents),
      document: node.document.uri,
    }
  } catch (error) {
    let message = 'deleting failed'
    if (error instanceof Error) {
      message += `: ${error.message}`
    }
    dispatch(setTemporaryInfo({ type: 'error', message }))
    throw error
  }
})

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
    createMath: (state, action: PayloadAction<boolean>) => {
      state.ui.create = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addGraph.fulfilled, (state, action) => {
        const { nodes, links } = action.payload
        nodes.forEach(node => {
          state.entities.node.byId[node.id] = {
            ...node,
            dependencies: [],
          }
          state.entities.node.allIds.push(node.id)
        })
        // add dependents to dependencies
        links.forEach(([dependent, dependency]) => {
          // @TODO make links to inexistent things better
          // now they just disappear
          // we'd like to have ghost nodes: the ones that were not found
          if (
            state.entities.node.byId[dependency] &&
            state.entities.node.byId[dependent]
          ) {
            state.entities.node.byId[dependency].dependents.push(dependent)
            state.entities.node.byId[dependent].dependencies.push(dependency)
          }
        })
      })
      .addCase(deleteNode.fulfilled, (state, action) => {
        const { dependents, dependencies, id: uri } = action.payload

        // remove this node as dependency from all dependents
        dependents.forEach(duri => {
          const newDependencies = state.entities.node.byId[
            duri
          ].dependencies.filter(u => u !== uri)
          state.entities.node.byId[duri].dependencies = newDependencies
        })
        // remove this node as dependent from all dependencies
        dependencies.forEach(duri => {
          state.entities.node.byId[duri].dependents = state.entities.node.byId[
            duri
          ].dependents.filter(u => u !== uri)
        })
        // remove this node
        delete state.entities.node.byId[uri]
        state.entities.node.allIds = state.entities.node.allIds.filter(
          i => i !== uri,
        )
        state.ui.selected = ''
      })
      .addMatcher(
        isAnyOf(updateNode.fulfilled, createNode.fulfilled),
        (state, action) => {
          const node = action.payload
          if (!state.entities.node.allIds.includes(node.id)) {
            state.entities.node.allIds.push(node.id)
            state.entities.node.byId[node.id] = node
          }
          state.entities.node.byId[node.id].label = node.label
          state.entities.node.byId[node.id].type = node.type
          state.entities.node.byId[node.id].description = node.description
          state.entities.node.byId[node.id].dependencies = node.dependencies
          // replace dependencies
          const oldDependencies =
            original(state)?.entities.node.byId[node.id]?.dependencies ?? []
          // fix dependents
          const deletedDependencies = oldDependencies.filter(
            d => !node.dependencies.includes(d),
          )
          const addedDependencies = node.dependencies.filter(
            d => !oldDependencies.includes(d),
          )
          addedDependencies.forEach(d => {
            state.entities.node.byId[d].dependents.push(node.id)
          })
          deletedDependencies.forEach(d => {
            state.entities.node.byId[d].dependents = state.entities.node.byId[
              d
            ].dependents.filter(a => a !== node.id)
          })
          state.ui.selected = node.id
        },
      )
  },
})

export const { highlight, select, createMath } = mathSlice.actions

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
export const selectCreateMath = (state: RootState) => state.math.ui.create

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
