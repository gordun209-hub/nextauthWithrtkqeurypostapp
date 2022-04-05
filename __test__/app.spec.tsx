import Layout from '../components/Layout'

import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import store from '../app/store'
import { postApi } from '../services/post'
function renderWithRedux(ui: JSX.Element) {
  const store = configureStore({
    reducer: {
      [postApi.reducerPath]: postApi.reducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(postApi.middleware)
  })
  return {
    ...render(<Provider store={store}>ui</Provider>)
  }
}

describe('renders smth', () => {
  it('should render', () => {
    renderWithRedux(
      <Layout>
        <div>laa</div>
      </Layout>
    )
  })
})
