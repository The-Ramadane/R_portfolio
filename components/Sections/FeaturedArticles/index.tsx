import { memo } from 'react'
import {
    Heading,
    Text,
    Link,
    Stack,
    SimpleGrid,
    useColorModeValue,
    Box,
    Image,
    Badge,
    Flex,
    Icon,
    Button,
} from '@chakra-ui/react'
import { BlogPost } from 'lib/blogService'
import NextLink from 'next/link'
import { FiArrowRight, FiCalendar } from 'react-icons/fi'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const FeaturedArticles = ({ articles }: { articles: BlogPost[] }) => {
    const bg = useColorModeValue('whiteAlpha.800', 'whiteAlpha.50')
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')
    const hoverBorderColor = useColorModeValue('teal.500', 'teal.300')
    const textColor = useColorModeValue('gray.600', 'gray.400')
    const titleColor = useColorModeValue('gray.800', 'white')

    return (
        <Stack
            width={{ base: '99%', lg: '60%', xl: '75%' }}
            height="100%"
            spacing={{ base: 8, xl: 10 }}
        >
            <Stack spacing={2}>
                <Heading
                    size="2xl"
                    style={{
                        fontVariantCaps: 'small-caps',
                    }}
                >
                    Blog
                </Heading>
                <Text variant="description" fontSize="lg">
                    Mes dernières réflexions et tutoriels.
                </Text>
            </Stack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10 }}>
                {articles.slice(0, 2).map((item) => (
                    <NextLink href={`/blog/${item.id}`} key={item.id}>
                        <Box
                            aria-label={item.title}
                            _hover={{ textDecoration: 'none' }}
                            role="group"
                            width="100%"
                        >
                            <MotionBox
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                                borderWidth="1px"
                                borderColor={borderColor}
                                borderRadius="2xl"
                                overflow="hidden"
                                bg={bg}
                                backdropFilter="blur(20px)"
                                boxShadow="lg"
                                height="100%"
                                display="flex"
                                flexDirection="column"
                                _hover={{
                                    borderColor: hoverBorderColor,
                                    boxShadow: '2xl',
                                }}
                            >
                                {item.cover_image && (
                                    <Box
                                        height="200px"
                                        width="100%"
                                        position="relative"
                                        overflow="hidden"
                                    >
                                        <Image
                                            src={item.cover_image}
                                            alt={item.title}
                                            objectFit="cover"
                                            width="100%"
                                            height="100%"
                                            transition="transform 0.3s ease"
                                            _groupHover={{ transform: 'scale(1.05)' }}
                                        />
                                    </Box>
                                )}

                                <Stack p={6} spacing={4} flex="1">
                                    <Flex justify="space-between" align="center">
                                        <Badge colorScheme="teal" variant="subtle" borderRadius="full" px={2}>
                                            {item.tags ? item.tags.split(',')[0] : 'Article'}
                                        </Badge>
                                        <Flex align="center" fontSize="xs" color="gray.500">
                                            <Icon as={FiCalendar} mr={1} />
                                            {new Date(item.published_at).toLocaleDateString('en-GB')}
                                        </Flex>
                                    </Flex>

                                    <Heading
                                        fontSize="xl"
                                        color={titleColor}
                                        lineHeight="tight"
                                        _groupHover={{ color: 'teal.400' }}
                                        transition="color 0.2s"
                                    >
                                        {item.title}
                                    </Heading>

                                    <Text color={textColor} fontSize="sm" noOfLines={3} flex="1">
                                        {item.description}
                                    </Text>

                                    <Flex align="center" color="teal.400" fontWeight="bold" fontSize="sm" mt="auto">
                                        Lire l'article
                                        <Icon as={FiArrowRight} ml={2} transition="transform 0.2s" _groupHover={{ transform: 'translateX(4px)' }} />
                                    </Flex>
                                </Stack>
                            </MotionBox>
                        </Box>
                    </NextLink>
                ))}
            </SimpleGrid>
            {articles.length > 2 && (
                <Flex justifyContent="center" width="100%">
                    <NextLink href="/blog">
                        <Button
                            as="div"
                            rightIcon={<Icon as={FiArrowRight} />}
                            colorScheme="teal"
                            variant="outline"
                            size="lg"
                            borderRadius="full"
                            px={8}
                            _hover={{
                                bg: 'teal.500',
                                color: 'white',
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                                textDecoration: 'none',
                                cursor: 'pointer'
                            }}
                            transition="all 0.2s"
                        >
                            Voir tous les articles
                        </Button>
                    </NextLink>
                </Flex>
            )}
        </Stack>
    );
}

export default memo(FeaturedArticles)
