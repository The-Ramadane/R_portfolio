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
import { FaGooglePlay } from 'react-icons/fa'
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
  ctaText?: string
  githubUrl?: string
  isMobile?: boolean
  highlight?: boolean
  badge?: string
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
  ctaText,
  githubUrl,
  isLeft,
  highlight,
  badge,
}: {
  idx?: number
  title: string
  description: React.ReactNode
  ctaUrl: string
  ctaText?: string
  githubUrl?: string
  isLeft: boolean
  highlight?: boolean
  badge?: string
}) => {
  const highlightColor = useColorModeValue('teal.600', 'cyan.300')
  const highlightBg = useColorModeValue('teal.50', 'rgba(0,200,200,0.08)')
  const badgeColor = useColorModeValue('green.700', 'green.300')
  const badgeBg = useColorModeValue('green.50', 'rgba(72,187,120,0.12)')
  const badgeBorder = useColorModeValue('green.200', 'green.500')
  return (
    <Container
      paddingX={{ base: 4, md: 5 }}
      paddingY={{ base: 4, md: 2 }}
      display="flex"
      alignItems={{ base: 'flex-start', md: 'center' }}
      justifyContent="space-around"
      flexDirection="column"
      maxW="100%"
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
        {badge && (
          <Text
            fontSize="xs"
            fontWeight="700"
            color={badgeColor}
            bg={badgeBg}
            border="1px solid"
            borderColor={badgeBorder}
            px={2.5}
            py={1}
            borderRadius="md"
            display="inline-block"
            width="fit-content"
            letterSpacing="wider"
            textTransform="uppercase"
            mb={1}
          >
            🌿 {badge}
          </Text>
        )}
        <Text
          fontSize={{ base: 'md', md: 'large', '2xl': 'xx-large' }}
          fontWeight="bold"
          letterSpacing={2}
          width={{ base: '100%', md: '90%' }}
          alignSelf={{ base: 'flex-start', md: isLeft ? 'flex-end' : 'flex-start' }}
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
          width={{ base: '100%', md: '90%' }}
          marginLeft={0}
          alignSelf={{ base: 'flex-start', md: isLeft ? 'flex-end' : 'flex-start' }}
        />
      </Stack>
      <Box
        fontSize="smaller"
        width={{ base: '100%', md: '90%' }}
        alignSelf={{ base: 'flex-start', md: isLeft ? 'flex-end' : 'flex-start' }}
        paddingY={{ base: 3, md: 1 }}
      >
        {description}
      </Box>
      <HStack
        spacing={3}
        width={{ base: '100%', md: '90%' }}
        alignSelf={{ base: 'flex-start', md: isLeft ? 'flex-end' : 'flex-start' }}
        marginY={{ base: 2, md: 2 }}
        flexWrap="wrap"
      >
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
            leftIcon={
              ctaUrl.includes('play.google.com') ? (
                <Icon as={FaGooglePlay} />
              ) : undefined
            }
          >
            {ctaText || (ctaUrl.includes('play.google.com') ? 'Google Play Store' : 'Voir le projet')}
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
  ctaText,
  githubUrl,
  highlight,
  badge,
}: FeaturedCardProps) => {
  const isEven = idx % 2 === 0
  const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.200')
  const highlightBorder = useColorModeValue('teal.300', 'cyan.500')
  const proBorder = useColorModeValue('green.300', 'green.500')

  return (
    <Box
      height="auto"
      bg={bg}
      borderRadius="1em"
      className={styles.featureCard}
      borderColor={highlight ? highlightBorder : badge ? proBorder : bg}
      borderWidth={highlight || badge ? '2px' : '1px'}
      boxShadow={
        highlight
          ? '0 0 16px rgba(72,187,120,0.18)'
          : badge
          ? '0 0 16px rgba(56,161,105,0.18)'
          : undefined
      }
      overflow="hidden"
    >
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 3, md: 0 }}
      >
        <Box order={{ base: 1, md: isEven ? 1 : 2 }}>
          <MotionImage
            height={height}
            width="100%"
            src={src}
            alt={title}
            objectFit="cover"
            objectPosition={objectPosition}
            loading="lazy"
            opacity={0.85}
            whileHover={variants.hover}
            whileTap={variants.tap}
            fallback={<Skeleton height={height} width="100%" />}
          />
        </Box>
        <Box
          order={{ base: 2, md: isEven ? 2 : 1 }}
          display="flex"
          alignItems="center"
        >
          <ProjectDescription
            idx={idx}
            title={title}
            description={description}
            ctaUrl={ctaUrl}
            ctaText={ctaText}
            githubUrl={githubUrl}
            isLeft={isEven}
            highlight={highlight}
            badge={badge}
          />
        </Box>
      </SimpleGrid>
    </Box>
  )
}
export default FeaturedCard
