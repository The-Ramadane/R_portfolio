import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'config/theme'
import FavIconProvider from 'components/Misc/FavIconProvider'
import { ReactElement } from 'react'
import { LangProvider } from 'lib/i18n'
import AnimatedBackground from 'components/Layout/AnimatedBackground'

function KLSite({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <LangProvider>
        <FavIconProvider>
          <AnimatedBackground />
          <Component {...pageProps} />
        </FavIconProvider>
      </LangProvider>
    </ChakraProvider>
  )
}
export default KLSite
