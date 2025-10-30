import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'config/theme'
import FavIconProvider from 'components/Misc/FavIconProvider'
import { ReactElement } from 'react'

function KLSite({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <FavIconProvider>
        <Component {...pageProps} />
      </FavIconProvider>
    </ChakraProvider>
  )
}
export default KLSite
