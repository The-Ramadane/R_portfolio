import { memo } from 'react'
import {
    Heading,
    Text,
    Stack,
    Grid,
    GridItem,
    useBreakpointValue,
    Box,
    Badge,
    HStack,
    Progress,
    useColorModeValue,
    Link,
    Icon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { fadeInUpSlower, galleryStagger } from 'config/animations'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

const MotionGrid = motion(Grid)
const MotionGridItem = motion(GridItem)

const OngoingProjects = [
    {
        title: 'Smart Recycle APP ♻️',
        description: 'Service backend intelligent qui reconnaît le type de déchet par image et indique la poubelle adéquate avec un message éducatif.',
        technologies: ['React Native', 'FastAPI', 'Python', 'ML', 'Docker'],
        status: 'Développement',
        progress: 35,
        url: '#',
        github: '#',
    },
]

const OngoingProjectCard = ({ project }: { project: typeof OngoingProjects[0] }) => {
    const bg = useColorModeValue('whiteAlpha.500', 'whiteAlpha.100')
    const border = useColorModeValue('gray.200', 'gray.700')

    return (
        <Box
            borderWidth="1px"
            borderColor={border}
            borderRadius="lg"
            bg={bg}
            p={5}
            h="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            transition="transform 0.2s"
            _hover={{ transform: 'translateY(-5px)', borderColor: 'teal.500' }}
        >
            <Box>
                <HStack justifyContent="space-between" mb={3}>
                    <Heading size="md" letterSpacing="wide">
                        {project.title}
                    </Heading>
                    <Badge colorScheme={project.progress > 80 ? 'green' : project.progress > 40 ? 'yellow' : 'blue'}>
                        {project.status}
                    </Badge>
                </HStack>
                <Text fontSize="sm" color="gray.500" mb={4}>
                    {project.description}
                </Text>
                <Stack spacing={2} mb={4}>
                    <HStack justify="space-between">
                        <Text fontSize="xs" fontWeight="bold">Avancement</Text>
                        <Text fontSize="xs">{project.progress}%</Text>
                    </HStack>
                    <Progress value={project.progress} size="xs" colorScheme="teal" borderRadius="full" />
                </Stack>
            </Box>

            <Box>
                <HStack spacing={2} wrap="wrap" mb={4}>
                    {project.technologies.map((tech) => (
                        <Badge key={tech} variant="subtle" colorScheme="gray" fontSize="0.7em">
                            {tech}
                        </Badge>
                    ))}
                </HStack>
                <HStack spacing={4} mt="auto">
                    {project.url !== '#' && (
                        <Link href={project.url} isExternal fontSize="sm" display="flex" alignItems="center" _hover={{ color: 'teal.400' }}>
                            Demo <Icon as={FaExternalLinkAlt} ml={1} w={3} h={3} />
                        </Link>
                    )}
                    {project.github !== '#' && (
                        <Link href={project.github} isExternal fontSize="sm" display="flex" alignItems="center" _hover={{ color: 'teal.400' }}>
                            Code <Icon as={FaGithub} ml={1} w={3} h={3} />
                        </Link>
                    )}
                </HStack>
            </Box>
        </Box>
    )
}

const OngoingProjectsSection = () => {
    return (
        <Stack
            width={{ base: '99%', lg: '60%', xl: '75%' }}
            height="100%"
            spacing={{ base: 6, xl: 8 }}
            alignItems={{ base: 'center', lg: 'flex-start' }}
            textAlign={{ base: 'center', lg: 'left' }}
        >
            <Heading
                size="2xl"
                style={{
                    fontVariantCaps: 'small-caps',
                }}
            >
                En Cours.
            </Heading>
            <Text variant="description">
                Aperçu de ce qui se prépare dans mon laboratoire. Des projets en pleine construction.
            </Text>

            <MotionGrid
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                gap={6}
                variants={galleryStagger}
                w="100%"
            >
                {OngoingProjects.map((project, idx) => (
                    <MotionGridItem key={idx} variants={fadeInUpSlower}>
                        <OngoingProjectCard project={project} />
                    </MotionGridItem>
                ))}
            </MotionGrid>
        </Stack>
    )
}

export default memo(OngoingProjectsSection)
