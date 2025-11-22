import { ReactElement } from 'react'
import {
  Box,
  Heading,
  Text,
  Container,
  useColorModeValue,
  SimpleGrid,
  Badge,
  HStack,
  VStack,
  Icon,
  Link,
  Avatar,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi'
import Menu from 'components/Menu'
import FadeInLayout from 'components/Layout/FadeWhenVisible'
import { Article } from 'types/article'

const MotionBox = motion(Box)

interface BlogProps {
  articles: Article[]
}

const Blog = ({ articles }: BlogProps): ReactElement => {
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.6)')
  const cardBorder = useColorModeValue('gray.200', 'gray.700')

  return (
    <>
      <Menu />
      <Container maxW="container.xl" py={{ base: 24, md: 32 }} position="relative" zIndex={1}>
        <FadeInLayout>
          <VStack spacing={16} align="stretch">
            {/* Header Section */}
            <Box textAlign="center" mb={8}>
              <Heading
                as="h1"
                size={{ base: '2xl', md: '4xl' }}
                mb={6}
                color={textColor}
                fontWeight="800"
                letterSpacing="tight"
              >
                Explorations & <Box as="span" color="gold.500">Réflexions</Box>
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color={useColorModeValue('gray.600', 'gray.400')}
                maxW="2xl"
                mx="auto"
                lineHeight="tall"
              >
                Plongez dans mes articles sur le développement, l'architecture logicielle et les dernières tendances technologiques.
              </Text>
            </Box>

            {/* Articles Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 8, md: 10 }}>
              {articles.map((post, index) => (
                <MotionBox
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Link
                    href={`/blog/${post.id}`}
                    _hover={{ textDecoration: 'none' }}
                    display="block"
                    height="100%"
                  >
                    <Box
                      bg={cardBg}
                      backdropFilter="blur(10px)"
                      borderRadius="2xl"
                      overflow="hidden"
                      border="1px solid"
                      borderColor={cardBorder}
                      boxShadow="lg"
                      transition="all 0.3s ease"
                      _hover={{
                        boxShadow: '2xl',
                        borderColor: 'gold.500',
                      }}
                      height="100%"
                      display="flex"
                      flexDirection="column"
                    >
                      {/* Image */}
                      <Box
                        height="220px"
                        bgImage={`url(${post.social_image || '/avatar.jpg'})`}
                        bgSize="cover"
                        bgPosition="center"
                        position="relative"
                      >
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          right={0}
                          bottom={0}
                          bgGradient="linear(to-b, transparent 60%, blackAlpha.600)"
                        />
                        <HStack position="absolute" bottom={4} left={4} spacing={2}>
                          {(Array.isArray(post.tag_list) ? post.tag_list : (typeof post.tag_list === 'string' ? (post.tag_list as string).split(',') : []))
                            .slice(0, 2)
                            .map((tag) => (
                              <Badge
                                key={tag}
                                colorScheme="gold"
                                variant="solid"
                                px={3}
                                py={1}
                                borderRadius="full"
                                fontSize="xs"
                                textTransform="lowercase"
                              >
                                #{tag.trim()}
                              </Badge>
                            ))}
                        </HStack>
                      </Box>

                      {/* Content */}
                      <VStack
                        align="stretch"
                        p={6}
                        spacing={4}
                        flex="1"
                      >
                        <Heading
                          as="h3"
                          size="md"
                          color={textColor}
                          fontWeight="700"
                          lineHeight="1.4"
                          noOfLines={2}
                        >
                          {post.title}
                        </Heading>

                        <Text
                          color={useColorModeValue('gray.600', 'gray.400')}
                          fontSize="sm"
                          noOfLines={3}
                          flex="1"
                        >
                          {post.description}
                        </Text>

                        <Box pt={4} borderTop="1px solid" borderColor={useColorModeValue('gray.100', 'gray.700')}>
                          <HStack justify="space-between" fontSize="xs" color="gray.500">
                            <HStack>
                              <Avatar size="xs" src={post.user.profile_image} name={post.user.name} />
                              <Text fontWeight="600">{post.user.name}</Text>
                            </HStack>
                            <HStack spacing={4}>
                              <HStack spacing={1}>
                                <Icon as={FiCalendar} />
                                <Text>{post.readable_publish_date}</Text>
                              </HStack>
                              <HStack spacing={1}>
                                <Icon as={FiClock} />
                                <Text>{post.reading_time_minutes} min</Text>
                              </HStack>
                            </HStack>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>
                  </Link>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </FadeInLayout>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://dev.to/api/articles?username=klawingco')
  const articles = await res.json()

  return {
    props: {
      articles,
    },
    revalidate: 60,
  }
}

export default Blog
