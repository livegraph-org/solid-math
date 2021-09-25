import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { selectGraph } from '../math/mathSlice'
import { Graph } from '../math/types'

interface SearchState {
  query: string
}

const initialState: SearchState = {
  query: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
  },
})

export const { setSearch } = searchSlice.actions

// Selectors
export const selectSearch = (state: RootState) => state.search.query

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

export default searchSlice.reducer
