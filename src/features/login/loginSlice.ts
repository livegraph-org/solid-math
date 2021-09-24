import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
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
export const init = createAsyncThunk('login/init', async () => {
  const response = await api.init()
  return response
})

export const login = createAsyncThunk(
  'login/login',
  async (oidcIssuer: string) => {
    const response = await api.login(oidcIssuer)
    return response
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
        state.webId = action.payload?.webId ?? ''
        state.isLoggedIn = action.payload?.isLoggedIn ?? false
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
