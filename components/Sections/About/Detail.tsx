import { memo } from 'react'
import {
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Icon,
  SimpleGrid,
  Box,
  Tooltip,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  SiDotnet,
  SiJavascript,
  SiTypescript,
  SiGraphql,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiDocker,
  SiSpringboot,
} from 'react-icons/si'
import { GiCoffeePot } from 'react-icons/gi'
import { IoMdOpen } from 'react-icons/io'

type ISkillSetModal = {
  onOpen(): void
}

const Detail = ({ onOpen }: ISkillSetModal) => {
  const emphasis = useColorModeValue('teal.500', 'cyan.200')
  const currentYear = new Date().getFullYear()
  const professionalYears = currentYear - 2016

  return (
    <Stack
      width={{ base: '100%', lg: '70%' }}
      height="100%"
      spacing={{ base: 5, md: 6, xl: 8 }}
      as="section"
      bg={useColorModeValue('white', 'gray.900')}
      borderRadius="xl"
      padding={{ base: 6, md: 8, lg: 10 }}
      boxShadow={useColorModeValue(
        '0 4px 20px rgba(0, 0, 0, 0.08)',
        '0 4px 20px rgba(0, 0, 0, 0.5)'
      )}
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.800')}
      alignItems={{ base: 'center', lg: 'flex-start' }}
    >
      <Heading
        as="h4"
        size={{ base: "xl", md: "2xl" }}
        letterSpacing="tight"
        fontWeight="700"
        color={useColorModeValue('gray.900', 'white')}
        textAlign={{ base: 'center', lg: 'left' }}
      >
        Ce que je fais.
      </Heading>
      <Text variant="description" fontSize="lg" lineHeight="tall" textAlign={{ base: "center", lg: "left" }}>
        <Tooltip label="Architecture & Logique métier" hasArrow>
          <Text as="span" fontWeight="bold" color={emphasis}>Développeur Backend & IA</Text>
        </Tooltip> basé à <Text as="span" fontWeight="bold">Lyon</Text>.
        Je fusionne la rigueur du développement <Tooltip label="Maîtrise du front au back" hasArrow><Text as="span" fontWeight="bold">Full-Stack</Text></Tooltip> (
        <Tooltip label="Framework Java robuste" hasArrow><Text as="span" fontWeight="bold" color={emphasis}>Spring Boot</Text></Tooltip>,{' '}
        <Tooltip label="Framework Frontend Google" hasArrow><Text as="span" fontWeight="bold" color={emphasis}>Angular</Text></Tooltip>,{' '}
        <Tooltip label="Base de données relationnelle avancée" hasArrow><Text as="span" fontWeight="bold" color={emphasis}>PostgreSQL</Text></Tooltip>)
        avec la puissance de la <Tooltip label="Machine Learning & Analytics" hasArrow><Text as="span" fontWeight="bold">Data Science</Text></Tooltip> pour bâtir des systèmes intelligents.
        <br /><br />
        Actuellement à l'<Tooltip label="École Centrale d'Électronique" hasArrow><Text as="span" fontWeight="bold">ECE Lyon</Text></Tooltip>, je suis animé par l'<Text as="span" fontWeight="bold">innovation</Text> et l'<Text as="span" fontWeight="bold">automatisation</Text>.
        Je transforme vos défis complexes en solutions logicielles performantes. 🚀
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 3, md: 4 }}>
        <List spacing={{ base: 3, md: 4 }}>
          <ListItem
            fontSize="small"
            display="flex"
            alignItems="center"
            p={{ base: 3, md: 4 }}
            borderRadius="md"
            bg={useColorModeValue('gray.50', 'gray.800')}
            transition="all 0.2s"
            _hover={{
              bg: useColorModeValue('gray.100', 'gray.700'),
            }}
          >
            <ListIcon as={SiSpringboot} color={useColorModeValue('gray.700', 'gray.300')} fontSize="1.5em" />
            Spring Boot
          </ListItem>
          <ListItem
            fontSize="small"
            display="flex"
            alignItems="center"
            p={{ base: 3, md: 4 }}
            borderRadius="md"
            bg={useColorModeValue('gray.50', 'gray.800')}
            transition="all 0.2s"
            _hover={{
              bg: useColorModeValue('gray.100', 'gray.700'),
            }}
          >
            <ListIcon as={SiJavascript} color={useColorModeValue('gray.700', 'gray.300')} fontSize="1.5em" />
            Javascript (ES6+)
          </ListItem>



        </List>
        <List spacing={{ base: 3, md: 4 }}>

          <ListItem
            fontSize="small"
            display="flex"
            alignItems="center"
            p={{ base: 3, md: 4 }}
            borderRadius="md"
            bg={useColorModeValue('gray.50', 'gray.800')}
            transition="all 0.2s"
            _hover={{
              bg: useColorModeValue('gray.100', 'gray.700'),
            }}
          >
            <ListIcon as={SiReact} color={useColorModeValue('gray.700', 'gray.300')} fontSize="1.5em" />
            React
          </ListItem>
          <ListItem
            fontSize="small"
            display="flex"
            alignItems="center"
            p={{ base: 3, md: 4 }}
            borderRadius="md"
            bg={useColorModeValue('gray.50', 'gray.800')}
            transition="all 0.2s"
            _hover={{
              bg: useColorModeValue('gray.100', 'gray.700'),
            }}
          >
            <ListIcon as={SiNextdotjs} color={useColorModeValue('gray.700', 'gray.300')} fontSize="1.5em" />
            NextJS
          </ListItem>

        </List>
        <Box gridColumn={{ base: '1', md: 'span 2' }}>
          <Text
            as="button"
            fontSize="sm"
            textAlign="center"
            onClick={onOpen}
            p={{ base: 3, md: 4 }}
            borderRadius="md"
            bg={useColorModeValue('gray.900', 'white')}
            color={useColorModeValue('white', 'gray.900')}
            fontWeight="500"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            width="100%"
            transition="all 0.2s"
            _hover={{
              bg: useColorModeValue('gray.800', 'gray.100'),
            }}
          >
            voir mon arsenal complet <Icon as={IoMdOpen} />
          </Text>
        </Box>
      </SimpleGrid>
    </Stack>
  )
}

export default memo(Detail)
