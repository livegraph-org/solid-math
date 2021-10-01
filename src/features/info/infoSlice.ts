import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'

export interface InfoState {
  message: string
  type: 'success' | 'error' | 'info'
}

const initialState: InfoState = {
  message: '',
  type: 'info',
}

export const setTemporaryInfo =
  (info: InfoState): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setInfo(info))
    await new Promise(resolve => {
      setTimeout(resolve, 5000)
    })
    const currentInfo = selectInfo(getState())
    if (
      currentInfo.message === info.message &&
      currentInfo.type === info.type
    ) {
      dispatch(clearInfo())
    }
  }

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<InfoState>) => {
      return action.payload
    },
    clearInfo: () => {
      return initialState
    },
  },
})

export const { setInfo, clearInfo } = infoSlice.actions

export const selectInfo = (state: RootState): InfoState => state.info

export default infoSlice.reducer
