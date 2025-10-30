import { useColorMode } from '@chakra-ui/react'
import Head from 'next/head'
import { ReactNode } from 'react'

const FavIconProvider = ({ children }: { children: ReactNode }) => {
  const { colorMode } = useColorMode()
  return (
    <>
      <Head>
        <link
          rel="icon"
          href={
            colorMode === 'dark' ? '/favicon.ico' : '/favicon-lightmode.ico'
          }
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  )
}

export default FavIconProvider
