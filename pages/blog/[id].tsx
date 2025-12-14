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
import ReactMarkdown from 'react-markdown'
import { getAllPosts, getPostById, BlogPost as BlogPostType } from 'lib/blogService'

interface BlogPostProps {
  article: BlogPostType
}

const BlogPost = ({ article }: BlogPostProps): ReactElement => {
  const router = useRouter()

  const textColor = useColorModeValue('gray.800', 'gray.100')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
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
            <Link href="/blog">
              {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */
              }
              <Button as="a" leftIcon={<FiArrowLeft />}>Retour au blog</Button>
            </Link>
          </VStack>
        </Container>
      </>
    );
  }

  // Calculate reading time: approx 200 words per minute
  const wordCount = article.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <>
      <Menu />
      <Container maxW="container.md" py={{ base: 24, md: 32 }} position="relative" zIndex={1}>
        <VStack spacing={8} align="stretch">
          {/* Exit / Back Navigation */}
          <Link href="/blog">
            {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */
            }
            <Button
              as="a"
              role="group"
              leftIcon={
                <Icon
                  as={FiArrowLeft}
                  transition="transform 0.2s"
                  _groupHover={{ transform: "translateX(-4px)" }}
                />
              }
              variant="link"
              color={mutedColor}
              fontWeight="medium"
              width="fit-content"
              _hover={{ color: "gold.500", textDecoration: 'none' }}
            >
              Retour
            </Button>
          </Link>

          {/* Article Header */}
          <VStack spacing={6} align="start" width="100%">
            <HStack spacing={2} wrap="wrap">
              {article.tags && article.tags.split(',').map((tag) => (
                <Badge
                  key={tag}
                  colorScheme="gray"
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="600"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {tag.trim()}
                </Badge>
              ))}
            </HStack>

            <Heading
              as="h1"
              size={{ base: '2xl', md: '3xl' }}
              lineHeight="1.2"
              fontWeight="800"
              color={textColor}
              letterSpacing="tight"
            >
              {article.title}
            </Heading>

            <HStack spacing={6} color={mutedColor} fontSize="sm" divider={<Box as="span" bg="gray.300" w="1px" h="15px" />}>
              <HStack spacing={2}>
                <Avatar size="xs" src="/r-avatar.png" name="Ramadane" />
                <Text fontWeight="600" color={textColor}>Ramadane</Text>
              </HStack>
              <Text>{new Date(article.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
              <Text>{readingTime} min de lecture</Text>
            </HStack>
          </VStack>

          {/* Cover Image */}
          {article.cover_image && (
            <Box
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="xl"
              position="relative"
              width="100vw"
              maxWidth="100%"
              marginLeft="50%"
              transform="translateX(-50%)"
              // Break out of container on larger screens if desired, but here keeping it contained but wide
              // actually let's keep it consistent width for readability focus
              w="100%"
              height={{ base: "250px", md: "400px" }}
            >
              <Image
                src={article.cover_image}
                alt={article.title}
                width="100%"
                height="100%"
                objectFit="cover"
                transition="transform 0.5s ease"
                _hover={{ transform: 'scale(1.02)' }}
              />
            </Box>
          )}

          {/* Content Body */}
          <Box
            className="article-content"
            fontSize={{ base: 'lg', md: 'lg' }}
            lineHeight="1.8"
            color={textColor}
            pb={10}
            sx={{
              '& p': { mb: 8 },
              '& h2': { fontSize: '2xl', fontWeight: 'bold', mt: 12, mb: 4, letterSpacing: 'tight' },
              '& h3': { fontSize: 'xl', fontWeight: 'bold', mt: 8, mb: 3 },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: 'gold.500',
                pl: 6,
                fontStyle: 'italic',
                my: 10,
                color: mutedColor,
              },
              '& img': { borderRadius: 'xl', boxShadow: 'lg', my: 8 },
              '& a': { color: 'gold.500', textDecoration: 'underline', textUnderlineOffset: '4px' },
              '& ul, & ol': { pl: 6, mb: 8 },
              '& li': { mb: 2 },
              '& pre': {
                bg: useColorModeValue('gray.50', 'gray.900'),
                p: 6,
                borderRadius: 'xl',
                overflowX: 'auto',
                mb: 8,
                border: '1px solid',
                borderColor: borderColor
              }
            }}
          >
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </Box>

          <Divider borderColor={borderColor} />

          {/* Footer Share & Author */}
          <VStack spacing={8} py={8}>
            <Heading size="md">Avez-vous apprécié cet article ?</Heading>
            <HStack spacing={4}>
              <Button
                leftIcon={<FaTwitter />}
                colorScheme="twitter"
                variant="outline"
                borderRadius="full"
                as="a"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                target="_blank"
              >
                Partager
              </Button>
              <Button
                leftIcon={<FaLinkedin />}
                colorScheme="linkedin"
                variant="outline"
                borderRadius="full"
                as="a"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.href : ''
                )}`}
                target="_blank"
              >
                LinkedIn
              </Button>
            </HStack>
          </VStack>

        </VStack>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts()

  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const article = await getPostById(params.id)

  if (!article) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
    },
    revalidate: 10,
  }
}

export default BlogPost
