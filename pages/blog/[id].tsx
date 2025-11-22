import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Heading,
  Text,
  Container,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
  Badge,
  Divider,
  Button,
  Image,
  Spinner,
  Avatar,
} from '@chakra-ui/react'
import { FiCalendar, FiClock, FiArrowLeft, FiShare2 } from 'react-icons/fi'
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa'
import Menu from 'components/Menu'
import Link from 'next/link'
import { Article } from 'types/article'

interface BlogPostProps {
  article: Article & {
    body_html: string
    reading_time_minutes: number
    published_at: string
    user: {
      name: string
      profile_image: string
    }
  }
}

const BlogPost = ({ article }: BlogPostProps): ReactElement => {
  const router = useRouter()

  const textColor = useColorModeValue('gray.800', 'gray.100')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const contentBg = useColorModeValue('rgba(255, 255, 255, 0.85)', 'rgba(26, 32, 44, 0.85)')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  // Loading state
  if (router.isFallback) {
    return (
      <>
        <Menu />
        <Container maxW="container.md" py={20} centerContent>
          <Spinner size="xl" color="gold.500" />
          <Text mt={4}>Chargement de l'article...</Text>
        </Container>
      </>
    )
  }

  if (!article) {
    return (
      <>
        <Menu />
        <Container maxW="container.md" py={20}>
          <VStack spacing={4}>
            <Heading>Article non trouvé</Heading>
            <Link href="/blog" passHref>
              <Button leftIcon={<FiArrowLeft />}>Retour au blog</Button>
            </Link>
          </VStack>
        </Container>
      </>
    )
  }

  console.log('Rendering article:', article?.title)

  return (
    <>
      <Menu />
      <Container maxW="container.lg" py={{ base: 24, md: 32 }} mt={{ base: 20, md: 28 }} position="relative" zIndex={1}>

        <VStack spacing={10} align="stretch">
          {/* Back Button */}
          <Link href="/blog" passHref>
            <Button
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              width="fit-content"
              size="sm"
              _hover={{ bg: 'whiteAlpha.200', color: 'gold.500' }}
            >
              Retour au blog
            </Button>
          </Link>

          {/* Header */}
          <Box textAlign="center" maxW="3xl" mx="auto">
            <HStack justify="center" spacing={2} mb={6}>
              {(Array.isArray(article.tags) ? article.tags : (typeof article.tag_list === 'string' ? article.tag_list.split(',').map(t => t.trim()) : article.tag_list))?.map((tag) => (
                <Badge
                  key={tag}
                  colorScheme="gold"
                  variant="outline"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontWeight="600"
                  fontSize="xs"
                  textTransform="lowercase"
                >
                  #{tag}
                </Badge>
              ))}
            </HStack>

            <Heading
              as="h1"
              size={{ base: '2xl', md: '3xl' }}
              mb={6}
              color={textColor}
              fontWeight="800"
              lineHeight="1.1"
              letterSpacing="tight"
            >
              {article.title}
            </Heading>

            <HStack
              justify="center"
              spacing={8}
              fontSize="sm"
              color={mutedColor}
              mb={8}
            >
              <HStack spacing={2}>
                <Avatar size="xs" src={article.user.profile_image} name={article.user.name} />
                <Text fontWeight="600">{article.user.name}</Text>
              </HStack>
              <HStack spacing={1}>
                <Icon as={FiCalendar} />
                <Text>{article.readable_publish_date}</Text>
              </HStack>
              <HStack spacing={1}>
                <Icon as={FiClock} />
                <Text>{article.reading_time_minutes} min de lecture</Text>
              </HStack>
            </HStack>
          </Box>

          {/* Cover Image */}
          {article.social_image && (
            <Box
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="2xl"
              maxH="500px"
              position="relative"
            >
              <Image
                src={article.social_image}
                alt={article.title}
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </Box>
          )}

          {/* Content */}
          <Box
            bg={contentBg}
            backdropFilter="blur(12px)"
            borderRadius="2xl"
            padding={{ base: 6, md: 12 }}
            boxShadow="xl"
            border="1px solid"
            borderColor={borderColor}
            className="article-content"
            maxW="4xl"
            mx="auto"
            width="100%"
          >
            <Box
              color={textColor}
              fontSize={{ base: 'md', md: 'lg' }}
              lineHeight="1.9"
              sx={{
                '& h1': { fontSize: '3xl', fontWeight: '800', mt: 12, mb: 6, letterSpacing: 'tight' },
                '& h2': { fontSize: '2xl', fontWeight: '700', mt: 10, mb: 4, letterSpacing: 'tight' },
                '& h3': { fontSize: 'xl', fontWeight: '600', mt: 8, mb: 3 },
                '& p': { mb: 6 },
                '& a': { color: 'gold.500', textDecoration: 'none', borderBottom: '1px dashed', _hover: { borderBottom: '1px solid' } },
                '& ul, & ol': { pl: 6, mb: 6 },
                '& li': { mb: 2 },
                '& img': { borderRadius: 'xl', my: 8, maxWidth: '100%', boxShadow: 'lg' },
                '& pre': {
                  bg: useColorModeValue('gray.900', 'black'),
                  color: 'gray.100',
                  p: 6,
                  borderRadius: 'xl',
                  overflowX: 'auto',
                  mb: 8,
                  fontSize: 'sm',
                  boxShadow: 'inner',
                },
                '& code': {
                  fontFamily: 'monospace',
                  fontSize: '0.9em',
                  bg: useColorModeValue('gray.100', 'gray.800'),
                  px: 1,
                  py: 0.5,
                  borderRadius: 'md',
                },
                '& blockquote': {
                  borderLeft: '4px solid',
                  borderColor: 'gold.500',
                  pl: 6,
                  fontStyle: 'italic',
                  my: 8,
                  color: mutedColor,
                  fontSize: 'xl',
                },
              }}
              dangerouslySetInnerHTML={{ __html: article.body_html }}
            />
          </Box>

          <Divider borderColor={borderColor} />

          {/* Share Section */}
          <Box
            bg={contentBg}
            backdropFilter="blur(12px)"
            borderRadius="xl"
            padding={{ base: 6, md: 8 }}
            border="1px solid"
            borderColor={borderColor}
            textAlign="center"
            maxW="2xl"
            mx="auto"
            width="100%"
          >
            <VStack spacing={6}>
              <HStack spacing={2}>
                <Icon as={FiShare2} />
                <Heading size="md" color={textColor}>
                  Partager cet article
                </Heading>
              </HStack>
              <HStack spacing={4}>
                <Button
                  leftIcon={<FaTwitter />}
                  colorScheme="twitter"
                  variant="solid"
                  as="a"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(article.url)}`}
                  target="_blank"
                >
                  Twitter
                </Button>
                <Button
                  leftIcon={<FaLinkedin />}
                  colorScheme="linkedin"
                  variant="solid"
                  as="a"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(article.url)}`}
                  target="_blank"
                >
                  LinkedIn
                </Button>
                <Button
                  leftIcon={<FaFacebook />}
                  colorScheme="facebook"
                  variant="solid"
                  as="a"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(article.url)}`}
                  target="_blank"
                >
                  Facebook
                </Button>
              </HStack>
            </VStack>
          </Box>

          {/* Back Button Bottom */}
          <Link href="/blog" passHref>
            <Button
              leftIcon={<FiArrowLeft />}
              variant="outline"
              width="fit-content"
              mx="auto"
              display="flex"
            >
              Retour au blog
            </Button>
          </Link>
        </VStack>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://dev.to/api/articles?username=klawingco')
  const articles = await res.json()

  const paths = articles.map((article: Article) => ({
    params: { id: article.id.toString() },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(`https://dev.to/api/articles/${params.id}`)

  if (!res.ok) {
    return {
      notFound: true,
    }
  }

  const article = await res.json()

  return {
    props: {
      article,
    },
    revalidate: 60, // Revalidate every 60 seconds
  }
}

export default BlogPost
