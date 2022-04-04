import { configureStore } from '@reduxjs/toolkit'
import { postApi } from '../services/post'
export function makeStore() {
  return configureStore({
    reducer: {
      [postApi.reducerPath]: postApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(postApi.middleware),
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
