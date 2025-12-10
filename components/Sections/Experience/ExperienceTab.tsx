import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
  useColorModeValue,
  Circle,
  Icon,
  Collapse,
  Button,
  Divider,
  useDisclosure,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ExperiencesList } from 'config/experience'
import { FiExternalLink, FiMapPin, FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi'

const MotionBox = motion(Box)

const ExperienceCard = ({ data, index, isLast }: { data: any; index: number; isLast: boolean }) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const dateColor = useColorModeValue('gray.600', 'gray.400')
  const roleColor = useColorModeValue('gray.700', 'gray.300')
  const lineColor = useColorModeValue('gray.200', 'gray.600')
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Flex gap={{ base: 4, md: 8 }} width="full">
      {/* Timeline Column */}
      <Flex direction="column" alignItems="center" minW={{ base: "40px", md: "60px" }}>
        <Circle
          size={{ base: "40px", md: "60px" }}
          bg={cardBg}
          border="2px solid"
          borderColor="teal.400"
          overflow="hidden"
          p={1}
          zIndex={1}
          boxShadow="md"
        >
          <Image
            src={data.logo.light}
            alt={data.name}
            objectFit="contain"
            w="full"
            h="full"
            borderRadius="full"
            fallbackSrc="https://via.placeholder.com/60"
          />
        </Circle>
        {!isLast && (
          <Box
            flex="1"
            w="2px"
            bg={lineColor}
            my={2}
            borderRadius="full"
          />
        )}
      </Flex>

      {/* Content Column */}
      <MotionBox
        flex="1"
        pb={isLast ? 0 : 10}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Box
          bg={cardBg}
          p={{ base: 4, md: 6 }}
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
          boxShadow="sm"
          _hover={{ boxShadow: 'md', borderColor: 'teal.300' }}
          transition="all 0.3s"
          position="relative"
        >
          {/* Header */}
          <Flex
            justify="space-between"
            align={{ base: 'flex-start', md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
            mb={2}
            onClick={onToggle}
            cursor="pointer"
          >
            <Box>
              <Heading size="md" fontWeight="bold" color="teal.500">
                {data.position}
              </Heading>
              <Link
                href={data.url}
                isExternal
                fontWeight="600"
                fontSize="lg"
                _hover={{ textDecoration: 'none', color: 'teal.400' }}
                display="flex"
                alignItems="center"
                gap={2}
                onClick={(e) => e.stopPropagation()}
              >
                {data.name}
                <Icon as={FiExternalLink} boxSize={4} />
              </Link>
            </Box>

            <VStack align={{ base: 'flex-start', md: 'flex-end' }} spacing={0} mt={{ base: 2, md: 0 }}>
              <Flex align="center" gap={2} color={dateColor} fontSize="sm" fontWeight="medium">
                <Icon as={FiCalendar} />
                <Text>{data.duration}</Text>
              </Flex>
              <Flex align="center" gap={2} color="gray.500" fontSize="xs">
                <Icon as={FiMapPin} />
                <Text>{data.subDetail}</Text>
              </Flex>
            </VStack>
          </Flex>

          {/* Toggle Button for mobile or quick access */}
          <Flex justify="center" mt={2} display={{ base: 'flex', md: 'none' }}>
            <Icon as={isOpen ? FiChevronUp : FiChevronDown} color="teal.500" />
          </Flex>

          {/* Collapsible Body */}
          <Collapse in={isOpen} animateOpacity>
            <Divider my={4} />
            <Box color={roleColor} fontSize="sm" lineHeight="relaxed">
              {data.roles?.map((role: any, i: number) => (
                <Text key={i} mb={2} display="flex" alignItems="start">
                  <Box as="span" mr={2} mt="6px" w="6px" h="6px" borderRadius="full" bg="teal.400" flexShrink={0} />
                  {role}
                </Text>
              ))}
            </Box>
          </Collapse>

          {/* Hint text if closed */}
          {!isOpen && (
            <Text fontSize="xs" color="gray.400" mt={2} fontStyle="italic" textAlign="right" cursor="pointer" onClick={onToggle}>
              Voir les détails...
            </Text>
          )}

        </Box>
      </MotionBox>
    </Flex>
  )
}

const ExperienceTab = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <VStack spacing={0} align="stretch">
        {ExperiencesList.map((experience, index) => (
          <ExperienceCard
            key={experience.name}
            data={experience}
            index={index}
            isLast={index === ExperiencesList.length - 1}
          />
        ))}
      </VStack>
    </Container>
  )
}

export default ExperienceTab
