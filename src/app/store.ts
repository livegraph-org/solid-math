import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import loginReducer from '../features/login/loginSlice'
import mathReducer, { addGraph } from '../features/math/mathSlice'
import watch from 'redux-watch'
import { addDocuments } from '../features/math/mathSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    math: mathReducer,
  },
})

// when userId changes, we want to fetch math documents of that new user
const watchLogin = watch(store.getState, 'login.webId')
store.subscribe(
  watchLogin((webId: string) => {
    store.dispatch(addDocuments(webId))
  }),
)

// when documents change, we want to fetch the new document
// TODO also remove the old documents
const watchDocuments = watch(store.getState, 'math.entities.document.allIds')
store.subscribe(
  watchDocuments((newDocs: string[], oldDocs: string[]) => {
    const diff = newDocs.filter((d: string) => !oldDocs.includes(d))
    diff.forEach(uri => store.dispatch(addGraph(uri)))
  }),
)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
