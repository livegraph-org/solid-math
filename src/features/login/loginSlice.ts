import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { addDocuments } from '../math/mathSlice'
import * as api from './loginAPI'

// State
export interface LoginState {
  webId: string
  isLoggedIn: boolean
  status: 'idle' | 'loading' | 'failed'
}

const initialState: LoginState = {
  webId: '',
  isLoggedIn: false,
  status: 'idle',
}

// Thunks
export const init = createAsyncThunk('login/init', async (_, { dispatch }) => {
  const response = await api.init()
  const webId = response?.webId ?? ''
  const isLoggedIn = response?.isLoggedIn ?? false
  dispatch(addDocuments(webId))
  return { webId, isLoggedIn }
})

export const login = createAsyncThunk(
  'login/login',
  async (oidcIssuer: string) => {
    await api.login(oidcIssuer)
  },
)

export const logout = createAsyncThunk('login/logout', async () => {
  await api.logout()
})

// Slice
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.status = 'loading'
      })
      .addCase(init.fulfilled, (state, action) => {
        state.status = 'idle'
        state.webId = action.payload.webId
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(login.pending, state => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, state => {
        state.status = 'idle'
      })
      .addCase(logout.pending, state => {
        state.status = 'loading'
      })
      .addCase(logout.fulfilled, () => {
        return initialState
      })
  },
})

// Selectors
export const selectSession = (state: RootState) => ({
  webId: state.login.webId,
  isLoggedIn: state.login.isLoggedIn,
})

export const selectLoginStatus = (state: RootState) => state.login.status

export default loginSlice.reducer
