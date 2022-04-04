import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../app/store'
import { ChakraProvider } from '@chakra-ui/react'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default App
