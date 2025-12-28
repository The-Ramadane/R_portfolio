import { memo } from 'react'
import {
  Heading,
  Text,
  Icon,
  Box,
  Tooltip,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
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
        Passionné par l'<Tooltip label="Deep Learning & Data" hasArrow><Text as="span" fontWeight="bold">Intelligence Artificielle</Text></Tooltip> et l'<Tooltip label="Architecture & Clean Code" hasArrow><Text as="span" fontWeight="bold">Ingénierie Logicielle</Text></Tooltip>, je conçois des solutions innovantes et performantes.
        <br /> <br />
        Je développe des architectures <Tooltip label="Framework Java robuste" hasArrow><Text as="span" fontWeight="bold" color={emphasis}>Backend (Spring Boot)</Text></Tooltip> et <Tooltip label="React, Next.js & Node" hasArrow><Text as="span" fontWeight="bold" color={emphasis}>Full-Stack</Text></Tooltip> robustes, tout en intégrant des composantes de <Tooltip label="Modèles prédictifs & IA" hasArrow><Text as="span" fontWeight="bold">Machine Learning</Text></Tooltip>.
        <br /> <br />
        Actuellement en <Tooltip label="École Centrale d'Électronique" hasArrow><Text as="span" fontWeight="bold">Bachelor à l'ECE Lyon</Text></Tooltip>, je combine technique et analyse pour transformer des défis complexes en solutions concrètes.
        <br /> <br />
        Mon ambition ? Développer des systèmes intelligents pour demain. 🚀
      </Text>

      <Box width="100%">
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
    </Stack>
  )
}

export default memo(Detail)
