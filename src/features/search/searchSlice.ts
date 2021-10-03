import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { selectGraph } from '../math/mathSlice'
import { Graph, GraphNode } from '../math/types'

interface SearchState {
  query: string
  queryAutocomplete: string
}

const initialState: SearchState = {
  query: '',
  queryAutocomplete: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setAutocomplete: (state, action: PayloadAction<string>) => {
      state.queryAutocomplete = action.payload
    },
  },
})

export const { setSearch, setAutocomplete } = searchSlice.actions

// Selectors
export const selectSearch = (state: RootState) => state.search.query
export const selectAutocomplete = (state: RootState) =>
  state.search.queryAutocomplete

const search = (
  query: string,
  graph: Graph,
): { label: string; value: string }[] => {
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
}

// This just returns full GraphNodes instead of limited info
const searchFull = (query: string, graph: Graph): GraphNode[] => {
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
    .slice(0, 10)
}

export const selectSearchResults = createSelector(
  selectSearch,
  selectGraph,
  search,
)

export const selectAutocompleteResults = createSelector(
  selectAutocomplete,
  selectGraph,
  searchFull,
)

export default searchSlice.reducer
