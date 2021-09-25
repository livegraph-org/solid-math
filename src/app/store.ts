import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import loginReducer from '../features/login/loginSlice'
import mathReducer from '../features/math/mathSlice'
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    math: mathReducer,
    search: searchReducer,
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
