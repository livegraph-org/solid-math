import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Entity } from '../../types'
import { selectWebId } from '../login/loginSlice'
import { addGraph } from '../math/mathSlice'
import { MathDocument } from '../math/types'
import * as api from './documentAPI'

export interface DocumentState {
  entities: {
    document: Entity<MathDocument>
  }
}

const initialState: DocumentState = {
  entities: {
    document: {
      byId: {},
      allIds: [],
    },
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

export const createDocument = createAsyncThunk(
  'math/createDocument',
  async (
    { uri, isPublic }: { uri: string; isPublic: boolean },
    { getState },
  ) => {
    const webId = selectWebId(getState() as RootState)
    try {
      await api.createMathDocument(uri, webId, isPublic)
    } catch (error) {
      console.error(error)
    }
    return uri
  },
)

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addDocuments.fulfilled, (state, action) => {
        state.entities.document = {
          byId: Object.fromEntries(action.payload.map(id => [id, { id }])),
          allIds: action.payload,
        }
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.entities.document.allIds.push(action.payload)
        state.entities.document.byId[action.payload] = { id: action.payload }
      })
  },
})

const selectDocumentEntities = (state: RootState) =>
  state.document.entities.document

export const selectDocuments = createSelector(
  selectDocumentEntities,
  ({ byId, allIds }) => allIds.map(id => byId[id]),
)

export default documentSlice.reducer
