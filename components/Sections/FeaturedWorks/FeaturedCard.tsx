/* eslint-disable react/no-multi-comp */
import {
  Box,
  Image,
  ResponsiveValue,
  Divider,
  Skeleton,
  Text,
  SimpleGrid,
  Button,
  Container,
  Stack,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import { Icon } from '@chakra-ui/react'
import styles from './styles.module.css'
import { easing, DURATIONS } from 'config/animations'

export type FeaturedCardProps = {
  // Still can't find what's correct value for responsive value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  height: string | ResponsiveValue<any>
  src: string
  idx: number
  title: string
  description: React.ReactNode
  objectPosition?: string
  ctaUrl: string
  githubUrl?: string
  isMobile?: boolean
  highlight?: boolean
}

const variants = {
  normal: {
    opacity: 0.85,
  },
  hover: {
    scale: 1.1,
    opacity: 1,
    transition: {
      duration: DURATIONS.Fast,
      ease: 'backOut',
    },
  },
  tap: {
    scale: 0.85,
    opacity: 1,
    transition: {
      duration: DURATIONS.Fast,
      ease: easing,
    },
  },
}

const MotionImage = motion(Image)

const ProjectDescription = ({
  idx,
  title,
  description,
  ctaUrl,
  githubUrl,
  isLeft,
  highlight,
}: {
  idx?: number
  title: string
  description: React.ReactNode
  ctaUrl: string
  githubUrl?: string
  isLeft: boolean
  highlight?: boolean
}) => {
  const highlightColor = useColorModeValue('teal.600', 'cyan.300')
  const highlightBg = useColorModeValue('teal.50', 'rgba(0,200,200,0.08)')
  return (
  <Container
    paddingX={5}
    paddingY={1}
    display="flex"
    alignItems="center"
    justifyContent="space-around"
    flexDirection="column"
  >
    <Stack spacing={1} width="100%">
      {highlight && (
        <Text
          fontSize="xs"
          fontWeight="700"
          color={highlightColor}
          bg={highlightBg}
          px={2}
          py={1}
          borderRadius="md"
          display="inline-block"
          width="fit-content"
          letterSpacing="wider"
          textTransform="uppercase"
          mb={1}
        >
          ⭐ Projet Phare MLOps
        </Text>
      )}
      <Text
        fontSize={{ base: 'md', md: 'large', '2xl': 'xx-large' }}
        fontWeight="bold"
        letterSpacing={2}
        width="90%"
        alignSelf={isLeft ? 'flex-end' : 'flex-start'}
        textTransform="uppercase"
        as="span"
      >
        <Text variant="accentAlternative" fontSize="md" as="span">
          #0{(idx || 0) + 1}
          {'  '}
        </Text>
        {title}
      </Text>
      <Divider
        borderColor="#A6A6A6"
        width="90%"
        marginLeft={0}
        alignSelf={isLeft ? 'flex-end' : 'flex-start'}
      />
    </Stack>
    <Box
      fontSize="smaller"
      width="90%"
      alignSelf={isLeft ? 'flex-end' : 'flex-start'}
      paddingY={{ base: 3, md: 0 }}
    >
      {description}
    </Box>
    <HStack spacing={3} width="90%" alignSelf={isLeft ? 'flex-end' : 'flex-start'} marginY={{ base: 3, md: 2 }} flexWrap="wrap">
      {ctaUrl && ctaUrl !== '#' && (
        <Button
          variant="outlineAlternative"
          fontWeight="light"
          fontSize={{ base: 'sm', '2xl': 'md' }}
          size="sm"
          as="a"
          href={ctaUrl}
          rel="noreferrer"
          target="_blank"
        >
          View Project
        </Button>
      )}
      {githubUrl && githubUrl !== '#' && (
        <Button
          variant="outline"
          fontWeight="light"
          fontSize={{ base: 'sm', '2xl': 'md' }}
          size="sm"
          as="a"
          href={githubUrl}
          rel="noreferrer"
          target="_blank"
          leftIcon={<Icon as={SiGithub} />}
        >
          GitHub
        </Button>
      )}
    </HStack>
  </Container>
)
}

const FeaturedCard = ({
  idx,
  height,
  src,
  title,
  description,
  objectPosition,
  ctaUrl,
  githubUrl,
  isMobile,
  highlight,
}: FeaturedCardProps) => {
  const isLeftImage = isMobile ? false : idx % 2 === 0
  const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.200')
  const highlightBorder = useColorModeValue('teal.300', 'cyan.500')
  const CoverImage = () => (
    <MotionImage
      height={height}
      width="100%"
      src={src}
      alt={title}
      objectFit="cover"
      objectPosition={objectPosition}
      loading="lazy"
      opacity={0.75}
      whileHover={variants.hover}
      whileTap={variants.tap}
      fallback={<Skeleton height={height} width="100%" />}
    />
  )

  return (
    <Box
      height="auto"
      bg={bg}
      borderRadius="1em"
      className={styles.featureCard}
      borderColor={highlight ? highlightBorder : bg}
      borderWidth={highlight ? '2px' : '1px'}
      boxShadow={highlight ? '0 0 16px rgba(72,187,120,0.18)' : undefined}
    >
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 3, md: 0 }}
        display={{ base: 'flex', md: 'grid' }}
        flexDirection={{ base: 'column-reverse', md: 'initial' }}
      >
        {isLeftImage && <CoverImage />}
        <ProjectDescription
          idx={idx}
          title={title}
          description={description}
          ctaUrl={ctaUrl}
          githubUrl={githubUrl}
          isLeft={isLeftImage}
          highlight={highlight}
        />
        {!isLeftImage && <CoverImage />}
      </SimpleGrid>
    </Box>
  )
}
export default FeaturedCard
