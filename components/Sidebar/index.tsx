import {
  Stack,
  Heading,
  Text,
  Button,
  useColorMode,
  Container,
  Link,
  Box,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import styles from './styles.module.css'
import {
  fadeInUp,
  letterSpace,
  simpleOpacity,
  stagger,
  scaleUp,
} from 'config/animations'
import { SocialMedias } from 'config/sidebar'
const Sidebar = () => {
  const { colorMode } = useColorMode()
  // Afficher la sidebar sur tous les écrans, mais avec des styles différents
  const display = useBreakpointValue({ base: 'block', xl: 'block' })
  const surNameSize = useBreakpointValue({
    base: '5xl',
    md: '5xl',
    lg: '5xl',
    xl: '5xl',
    '2xl': '5xl',
  })
  const MotionHeading = motion(Heading)
  const MotionText = motion(Text)
  const MotionStack = motion(Stack)
  const MotionButton = motion(Button)
  const MotionBox = motion(Box)
  // ... (surNameSize)

  // ... (Motion components)

  return (
    <MotionBox
      initial="initial"
      animate="animate"
      position={{ xl: 'sticky' }}
      top={{ xl: '160px' }}
      display={display}
      width={{ base: '90%', xl: '100%' }} // 90% width below xl
      margin={{ base: '0 auto', xl: '0' }} // Centered below xl
      marginBottom={{ base: '40px', xl: '0' }} // Spacing below on mobile/tablet
    >
      <Container
        padding={0}
        margin={0}
        height="auto"
        w="100%"
        maxWidth="100%"
      >
        <MotionStack
          variants={stagger}
          spacing={{ base: 5, md: 6 }}
          w="100%"
          bg={colorMode === 'dark' ? 'gray.900' : 'white'}
          borderRadius="xl"
          paddingX={{ base: 6, md: 8, lg: 10, xl: 4, '2xl': 10 }}
          paddingBottom={{ base: 6, md: 8, lg: 10 }}
          paddingTop={{ base: 6, md: 8, lg: 10 }}
          boxShadow={colorMode === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.5)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)'}
          border="1px solid"
          borderColor={colorMode === 'dark' ? 'gray.800' : 'gray.200'}
          alignItems={{ base: 'center', xl: 'flex-start' }}
        >
          <MotionText
            variants={fadeInUp}
            variant="accent"
            fontWeight="medium"
            fontSize="sm"
            letterSpacing="wide"
            textAlign={{ base: 'center', xl: 'left' }}
          >
            👋 Ahh vous me cherchez ? Bonjour! je suis
          </MotionText>
          <MotionHeading
            as="h1"
            size={{ base: "xl", md: "2xl", xl: "xl", "2xl": "2xl" }}
            textTransform="uppercase"
            variants={fadeInUp}
            fontWeight="700"
            letterSpacing="tight"
            color={colorMode === 'dark' ? 'white' : 'gray.900'}
            textAlign={{ base: 'center', xl: 'left' }}
          >
            Diallo Mouhammadou
          </MotionHeading>
          <MotionHeading
            as="h2"
            fontSize={surNameSize}
            variant="emphasis"
            className={styles.marginTopForce}
            textTransform="uppercase"
            variants={letterSpace}
            textAlign={{ base: 'center', xl: 'left' }}
          >
            Ramadane.
          </MotionHeading>
          <MotionText
            colorScheme="gray"
            fontSize="smaller"
            className={styles.marginTopForce}
            variants={fadeInUp}
            textAlign={{ base: 'center', xl: 'left' }}
          >
            Ou tu pourrais m'appeler Ramadane😉. Ça marche aussi...
          </MotionText>

          <MotionHeading
            as="h3"
            size={{ base: "sm", md: "md" }}
            className={styles.marginTopSmall}
            variants={fadeInUp}
            fontWeight="600"
            color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}
            textAlign={{ base: 'center', xl: 'left' }}
          >
            💻 Developpeur FullStack / mobile / IA
          </MotionHeading>

          <MotionText
            variant="description"
            fontSize="small"
            paddingRight={{ lg: '12' }}
            variants={fadeInUp}
            maxWidth={{ base: '100%', lg: '80%' }}
            lineHeight="tall"
            textAlign={{ base: 'center', xl: 'left' }}
          >
            Merci beaucoup d’être passé sur mon site,
            <Text variant="emphasis" as="span">
              {' '}
              ça me fait super plaisir ! ✨
            </Text>
            <br /> Passionné par le backend, l'intégration front-end et le machine learning.
          </MotionText>
          <MotionButton
            size={{ base: "md", md: "lg" }}
            variant="outline"
            fontWeight="normal"
            fontSize="sm"
            width={{ base: "100%", md: "fit-content" }}
            px={{ base: 6, md: 8 }}
            variants={simpleOpacity}
            as="a"
            // @ts-expect-error - Chakra UI typing issue with motion components
            href="mailto:mouhammadouramadaned@gmail.com"
            target="_blank"
          >
            Entrez en contact
          </MotionButton>

          <MotionBox
            display="flex"
            gap={3}
            variants={simpleOpacity}
            flexWrap="wrap"
            justifyContent={{ base: 'center', xl: 'flex-start' }}
          >
            {SocialMedias.map((socMedia) => (
              <Link
                key={socMedia.label}
                variant="description"
                aria-label={socMedia.label}
                rel="noreferrer"
                href={socMedia.href}
                target="_blank"
                display="flex"
                alignItems="center"
                justifyContent="center"
                w={{ base: 9, md: 10 }}
                h={{ base: 9, md: 10 }}
                borderRadius="md"
                border="1px solid"
                borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.300'}
                _hover={{
                  borderColor: colorMode === 'dark' ? 'gold.400' : 'gold.500',
                  bg: colorMode === 'dark' ? 'gray.800' : 'gray.50',
                }}
                transition="all 0.2s"
                _focus={{ boxShadow: 'none' }}
              >
                <Icon w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} as={socMedia.icon} />
              </Link>
            ))}
          </MotionBox>
        </MotionStack>
      </Container>
    </MotionBox>
  )
}

export default Sidebar
