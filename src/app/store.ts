import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import loginReducer from '../features/login/loginSlice'
import mathReducer from '../features/math/mathSlice'
import searchReducer from '../features/search/searchSlice'
import documentReducer from '../features/document/documentSlice'
import infoReducer from '../features/info/infoSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    math: mathReducer,
    search: searchReducer,
    document: documentReducer,
    info: infoReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
