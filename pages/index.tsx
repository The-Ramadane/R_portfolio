import {
  Grid,
  GridItem,
  Stack,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import OpenGraphHead from 'components/Misc/OpenGraphHead'
import FadeInLayout from 'components/Layout/FadeWhenVisible'
import Menu from 'components/Menu'
import Sidebar from 'components/Sidebar'
import Avatar from 'components/Avatar'
import About from 'components/Sections/About'
import Experience from 'components/Sections/Experience'
import FeaturedWorks from 'components/Sections/FeaturedWorks'
import OngoingProjects from 'components/Sections/OngoingProjects'
import ScrollMore from 'components/Misc/ScrollMore'
import { BlogPost, getAllPosts } from 'lib/blogService'
import { ReactElement } from 'react'
import Formation from '../components/Sections/Formation'

const FeaturedArticles = dynamic(() => import('components/Sections/FeaturedArticles'))
const GetInTouch = dynamic(() => import('components/Sections/GetInTouch'))
const Newsletter = dynamic(() => import('components/Sections/Newsletter'))

const Portfolio = ({ articles }: { articles: BlogPost[] }): ReactElement => {
  const sideBarPadding = useBreakpointValue({
    base: '5',
    md: '8',
    lg: '14',
    xl: 20,
  })
  const mainContent = useBreakpointValue({
    base: '5',
    md: '14',
    lg: '14',
    xl: 20,
  })
  const paddTop = useBreakpointValue({ base: '20', sm: 20, md: 20 })
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
        `}
      </Script>
      <OpenGraphHead />
      <Menu />
      <Grid
        id="mainGrid"
        marginTop={{ base: '100px', lg: '130px', xl: '160px' }}
        templateColumns={{
          base: 'repeat(1, 1fr)',
          xl: 'repeat(5, 1fr)',
        }}
        templateRows={{
          sm: 'repeat(1, 0)',
          lg: 'repeat(2, 1fr)',
        }}
        gap={4}
      >
        <GridItem
          paddingLeft={{ base: '5', md: '8', lg: '14', xl: 20 }}
          paddingRight={{ base: '5', md: '8', lg: '14', xl: 8 }}
          paddingBottom={{ base: '5', md: '8', lg: '14', xl: 20 }}
          rowSpan={2}
          colSpan={{ base: 1, xl: 2 }}
          display="flex"
          alignItems="flex-start"
          as="div"
          flexDirection={'row'}
        >
          <Sidebar />
        </GridItem>
        <GridItem
          as="main"
          paddingRight={{ base: '5', md: '14', lg: '14', xl: 20 }}
          paddingLeft={{ base: '5', md: '14', lg: '14', xl: 8 }}
          paddingBottom={{ base: '5', md: '14', lg: '14', xl: 20 }}
          rowSpan={2}
          colSpan={{ base: 1, xl: 3 }}
          overflow="hidden"
        >
          <Stack w="100%" spacing={24}>
            <FadeInLayout>
              <Box
                id="aboutMe"
                className="contentRow"
                minH={{ lg: 'auto' }}
                display="flex"
                alignItems={{ base: 'center', lg: 'start' }}
                justifyContent="center"
                scrollMarginTop={{ base: '100px', xl: '180px' }}
                paddingTop={{ base: 0, lg: 0, xl: 0 }}
                paddingBottom={{ base: 12, lg: 0 }}
                flexDirection={{
                  base: 'column-reverse',
                  lg: 'row',
                }}
              >
                <About />
                <Avatar />
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                id="formation"
                className="contentRow"
                paddingTop={{ base: 0, lg: 20, xl: 0 }}
                paddingBottom={{ base: 12, lg: 10 }}
                paddingX={0}
                flexDirection={'row'}
              >
                <Formation />
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                id="jobs"
                className="contentRow"
                paddingTop={{ base: 0, lg: 20, xl: 0 }}
                paddingBottom={{ base: 12, lg: 10 }}
                paddingX={0}
                flexDirection={'row'}
              >
                <Experience />
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                id="works"
                className="contentRow"
                paddingTop={{ base: 0, lg: 20, xl: 20 }}
                paddingBottom={{ base: 12, lg: 10 }}
                paddingX={0}
                flexDirection={'row'}
              >
                <FeaturedWorks />
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                id="ongoing"
                className="contentRow"
                paddingTop={{ base: 0, lg: 20, xl: 20 }}
                paddingBottom={{ base: 12, lg: 10 }}
                paddingX={0}
                flexDirection={'row'}
              >
                <OngoingProjects />
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                id="blog"
                className="contentRow"
                paddingTop={{ base: 0, lg: 20, xl: 20 }}
                paddingBottom={{ base: 12, lg: 10 }}
                paddingX={0}
                flexDirection={'row'}
              >
                <FeaturedArticles articles={articles} />
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                id="newsletter"
                className="contentRow"
                paddingTop={{ base: 0, lg: 20, xl: 20 }}
                paddingBottom={{ base: 12, lg: 10 }}
                paddingX={0}
                flexDirection={'row'}
              >
                <Newsletter />
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                id="contact"
                className="contentRow"
                paddingTop={{ base: 0, lg: 20, xl: 20 }}
                paddingX={0}
                flexDirection={'row'}
              >
                <GetInTouch />
              </Box>
            </FadeInLayout>
            
          </Stack>
        </GridItem>
      </Grid >
      <ScrollMore />
    </>
  )
}

export async function getStaticProps() {
  const articles = await getAllPosts()

  // Optimization: Don't send full content to client for the index page to reduce JSON size
  const optimizedArticles = articles.map(article => ({
    ...article,
    content: '' // Strip content for list view
  }))

  return {
    props: {
      articles: JSON.parse(JSON.stringify(optimizedArticles)),
    },
    revalidate: 10,
  }
}

export default Portfolio
