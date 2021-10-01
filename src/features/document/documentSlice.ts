import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../app/store'
import { Entity } from '../../types'
import { setTemporaryInfo } from '../info/infoSlice'
import { selectWebId } from '../login/loginSlice'
import { addGraph } from '../math/mathSlice'
import { MathDocument } from '../math/types'
import * as api from './documentAPI'

export interface DocumentState {
  entities: {
    document: Entity<MathDocument>
  }
  selected: string
}

const initialState: DocumentState = {
  entities: {
    document: {
      byId: {},
      allIds: [],
    },
  },
  selected: '',
}

// Thunks
export const addDocuments = createAsyncThunk(
  'math/addDocuments',
  async (webId: string, { dispatch }) => {
    const documents = await api.findMathDocumentsOfPerson(webId)
    documents.forEach(doc => dispatch(addGraph(doc.uri)))
    return documents
  },
)

export const createDocument = createAsyncThunk<
  MathDocument,
  { uri: string; isPublic: boolean },
  {
    dispatch: AppDispatch
    getState: () => RootState
  }
>('math/createDocument', async ({ uri, isPublic }, { getState, dispatch }) => {
  const webId = selectWebId(getState() as RootState)
  try {
    dispatch(
      setTemporaryInfo({ type: 'info', message: 'creating a new document' }),
    )
    const newDocument = await api.createMathDocument(uri, webId, isPublic)
    dispatch(
      setTemporaryInfo({ type: 'success', message: 'created a new document' }),
    )

    return newDocument
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setTemporaryInfo({ type: 'error', message: error.message }))
    }
    throw error
  }
})

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    selectDocument: (state, action: PayloadAction<string>) => {
      state.selected = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addDocuments.fulfilled, (state, action) => {
        state.entities.document = {
          byId: Object.fromEntries(action.payload.map(doc => [doc.id, doc])),
          allIds: action.payload.map(doc => doc.id),
        }
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.entities.document.allIds.push(action.payload.id)
        state.entities.document.byId[action.payload.id] = action.payload
      })
  },
})

export const { selectDocument } = documentSlice.actions

const selectDocumentEntities = (state: RootState) =>
  state.document.entities.document

export const selectDocuments = createSelector(
  selectDocumentEntities,
  ({ byId, allIds }) => allIds.map(id => byId[id]),
)

export const selectSelectedDocument = (state: RootState) =>
  state.document.selected

export default documentSlice.reducer
