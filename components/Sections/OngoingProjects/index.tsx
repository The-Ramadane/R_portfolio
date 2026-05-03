import { memo, useState } from 'react'
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
    Image,
    AspectRatio,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    SimpleGrid,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { fadeInUpSlower, galleryStagger } from 'config/animations'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

const MotionGrid = motion(Grid)
const MotionGridItem = motion(GridItem)

const OngoingProjects = [
    {
        title: 'Together 🎓',
        description: 'Réseau social étudiant multi-campus (SaaS) centralisant événements, associations et messagerie temps réel. Architecture scalable avec rôles granulaires.',
        technologies: ['React Native', 'NestJS', 'PostgreSQL', 'Socket.io', 'TypeScript'],
        status: 'Avancé',
        progress: 80,
        url: '#',
        github: '#',
        image: '/works/together/feed.jpg',
        gallery: [
            '/works/together/feed.jpg',
            '/works/together/campus_select.jpg',
            '/works/together/welcome.jpg',
            '/works/together/register.jpg',
        ],
    },
]

const ProjectDetailModal = ({
    isOpen,
    onClose,
    project
}: {
    isOpen: boolean,
    onClose: () => void,
    project: typeof OngoingProjects[0]
}) => {
    const [selectedImage, setSelectedImage] = useState(project.image)

    // Ensure selectedImage is updated when project changes or modal opens
    if (!selectedImage && project.image) setSelectedImage(project.image)

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="9xl" scrollBehavior="inside" isCentered motionPreset="slideInBottom">
            <ModalOverlay backdropFilter="blur(5px)" />
            <ModalContent maxW="900px" maxH="85vh">
                <ModalHeader fontSize="2xl">{project.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody p={6}>
                    <Stack spacing={8}>
                        {/* Main Image Display */}
                        {selectedImage ? (
                            <Box
                                borderRadius="xl"
                                overflow="hidden"
                                boxShadow="2xl"
                                bg="gray.900"
                                position="relative"
                                height={{ base: '300px', md: '500px' }} // Responsive height
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Image
                                    src={selectedImage}
                                    objectFit="contain"
                                    maxH="100%"
                                    maxW="100%"
                                />
                            </Box>
                        ) : null}

                        {/* Gallery Thumbnails */}
                        {project.gallery && project.gallery.length > 0 && (
                            <SimpleGrid columns={[4, 5, 6]} spacing={4}>
                                {project.gallery.map((img, idx) => (
                                    <Box
                                        key={idx}
                                        cursor="pointer"
                                        borderWidth={selectedImage === img ? '3px' : '2px'}
                                        borderColor={selectedImage === img ? 'teal.400' : 'gray.700'}
                                        borderRadius="lg"
                                        overflow="hidden"
                                        onClick={() => setSelectedImage(img)}
                                        opacity={selectedImage === img ? 1 : 0.5}
                                        _hover={{ opacity: 1, transform: 'translateY(-2px)' }}
                                        transition="all 0.2s"
                                        aspectRatio={1}
                                        boxShadow={selectedImage === img ? 'outline' : 'none'}
                                    >
                                        <Image src={img} w="100%" h="100%" objectFit="cover" />
                                    </Box>
                                ))}
                            </SimpleGrid>
                        )}

                        <HStack align="start" spacing={10} divider={<Box w="1px" h="100px" bg="gray.700" />}>
                            {/* Left Col: Description */}
                            <Box flex={1}>
                                <Heading size="md" mb={4}>À propos du projet</Heading>
                                <Text color="gray.400" fontSize="md" lineHeight="tall">
                                    {project.description}
                                </Text>
                            </Box>

                            {/* Right Col: Details */}
                            <Stack flex={0.5} spacing={6}>
                                <Box>
                                    <Heading size="xs" textTransform="uppercase" color="gray.500" mb={3}>État d'avancement</Heading>
                                    <HStack mb={2}>
                                        <Badge colorScheme={project.progress > 80 ? 'green' : project.progress > 40 ? 'yellow' : 'blue'} fontSize="0.9em" px={2} py={1}>
                                            {project.status}
                                        </Badge>
                                        <Text fontWeight="bold">{project.progress}%</Text>
                                    </HStack>
                                    <Progress value={project.progress} size="sm" colorScheme="teal" borderRadius="full" />
                                </Box>

                                <Box>
                                    <Heading size="xs" textTransform="uppercase" color="gray.500" mb={3}>Technologies</Heading>
                                    <HStack spacing={2} wrap="wrap">
                                        {project.technologies.map((tech) => (
                                            <Badge key={tech} px={2} py={1} borderRadius="md" variant="subtle" colorScheme="teal">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </HStack>
                                </Box>
                            </Stack>
                        </HStack>
                    </Stack>
                </ModalBody>

                <ModalFooter bg={useColorModeValue('gray.50', 'whiteAlpha.50')} borderRadius="0 0 md md" p={4}>
                    <HStack spacing={4} width="100%" justify="space-between">
                        <HStack>
                            {project.url !== '#' && (
                                <Link href={project.url} isExternal style={{ textDecoration: 'none' }}>
                                    <Button leftIcon={<Icon as={FaExternalLinkAlt} />} colorScheme="teal" variant="solid">
                                        Voir la Demo
                                    </Button>
                                </Link>
                            )}
                            {project.github !== '#' && (
                                <Link href={project.github} isExternal style={{ textDecoration: 'none' }}>
                                    <Button leftIcon={<Icon as={FaGithub} />} variant="outline">
                                        Code Source
                                    </Button>
                                </Link>
                            )}
                        </HStack>
                        <Button onClick={onClose} variant="ghost">Fermer</Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const OngoingProjectCard = ({ project }: { project: typeof OngoingProjects[0] }) => {
    const bg = useColorModeValue('whiteAlpha.500', 'whiteAlpha.100')
    const border = useColorModeValue('gray.200', 'gray.700')
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Box
                borderWidth="1px"
                borderColor={border}
                borderRadius="lg"
                bg={bg}
                p={6}
                h="100%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                transition="all 0.3s"
                _hover={{
                    transform: 'translateY(-5px)',
                    borderColor: 'teal.500',
                    boxShadow: 'xl',
                    bg: 'whiteAlpha.200'
                }}
                cursor="pointer"
                onClick={onOpen}
                position="relative"
                role="group"
            >
                <Box>
                    <HStack justifyContent="space-between" mb={6}>
                        <Heading size="lg" letterSpacing="tight">
                            {project.title}
                        </Heading>
                        <Badge
                            colorScheme={project.progress > 80 ? 'green' : project.progress > 40 ? 'yellow' : 'blue'}
                            px={3} py={1} borderRadius="full"
                        >
                            {project.status}
                        </Badge>
                    </HStack>

                    <Text fontSize="md" color="gray.400" mb={8} noOfLines={3} lineHeight="tall">
                        {project.description}
                    </Text>

                    <Stack spacing={3} mb={6}>
                        <HStack justify="space-between">
                            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" color="gray.500">Avancement</Text>
                            <Text fontSize="xs" fontWeight="bold">{project.progress}%</Text>
                        </HStack>
                        <Progress value={project.progress} size="xs" colorScheme="teal" borderRadius="full" />
                    </Stack>
                </Box>

                <Box mt="auto">
                    <HStack spacing={2} wrap="wrap" mb={6}>
                        {project.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" px={2} py={1} borderRadius="md" colorScheme="gray" fontSize="xs">
                                {tech}
                            </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                            <Text fontSize="xs" color="gray.500">+{project.technologies.length - 3}</Text>
                        )}
                    </HStack>

                    <Button
                        size="md"
                        width="100%"
                        variant="outline"
                        colorScheme="teal"
                        rightIcon={<Icon as={FaExternalLinkAlt} />}
                        _groupHover={{ bg: 'teal.500', color: 'white', borderColor: 'teal.500' }}
                    >
                        Explorer
                    </Button>
                </Box>
            </Box>

            <ProjectDetailModal isOpen={isOpen} onClose={onClose} project={project} />
        </>
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
