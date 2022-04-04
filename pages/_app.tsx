import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../app/store'
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default App
