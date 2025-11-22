import {
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  HStack,
  Icon,
  Badge,
} from '@chakra-ui/react'
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { Formations } from 'config/formation'

const FormationList = () => {
  const cardBg = useColorModeValue('white', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const iconColor = useColorModeValue('gold.500', 'gold.300')

  return (
    <VStack spacing={6} align="stretch" mt={8}>
      {Formations.map((formation, index) => (
        <Box
          key={index}
          p={6}
          bg={cardBg}
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
          boxShadow="lg"
          transition="all 0.3s"
          _hover={{
            transform: 'translateY(-5px)',
            boxShadow: 'xl',
            borderColor: iconColor,
          }}
        >
          <HStack justify="space-between" align="start" mb={4} wrap="wrap" spacing={4}>
            <HStack spacing={3}>
              <Box
                p={2}
                bg={useColorModeValue('orange.50', 'whiteAlpha.100')}
                borderRadius="lg"
                color={iconColor}
              >
                <Icon as={FaGraduationCap} boxSize={6} />
              </Box>
              <VStack align="start" spacing={1}>
                <Heading size="md" fontWeight="bold">
                  {formation.title}
                </Heading>
                <Text fontWeight="600" color={useColorModeValue('gray.600', 'gray.400')}>
                  {formation.institution}
                </Text>
              </VStack>
            </HStack>
            <Badge
              colorScheme="orange"
              variant="subtle"
              px={3}
              py={1}
              borderRadius="full"
              display="flex"
              alignItems="center"
            >
              <Icon as={FaCalendarAlt} mr={2} />
              {formation.period}
            </Badge>
          </HStack>

          <HStack spacing={2} color="gray.500" fontSize="sm" mt={2}>
            <Icon as={FaMapMarkerAlt} />
            <Text>{formation.location}</Text>
          </HStack>
        </Box>
      ))}
    </VStack>
  )
}

export default FormationList
