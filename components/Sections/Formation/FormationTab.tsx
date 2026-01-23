import { useState } from 'react'
import {
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  HStack,
  Icon,
  Badge,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaFilePdf, FaCertificate } from 'react-icons/fa'
import { Formations, Formation } from 'config/formation'

const FormationList = () => {
  const cardBg = useColorModeValue('white', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const iconColor = useColorModeValue('gold.500', 'gold.300')
  const tabBg = useColorModeValue('gray.100', 'gray.800')
  const activeTabColor = useColorModeValue('gold.600', 'gold.400')
  const activeTabBg = useColorModeValue('white', 'gray.700')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedCert, setSelectedCert] = useState<string | null>(null)
  const [selectedTitle, setSelectedTitle] = useState<string>('')

  const handleOpenCert = (certPath: string, title: string) => {
    setSelectedCert(certPath)
    setSelectedTitle(title)
    onOpen()
  }

  const educations = Formations.filter(f => f.type === 'Education')
  const certifications = Formations.filter(f => f.type === 'Certification')

  const renderList = (items: Formation[]) => (
    <VStack spacing={6} align="stretch" mt={4}>
      {items.map((item, index) => (
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
                <Icon as={item.type === 'Certification' ? FaCertificate : FaGraduationCap} boxSize={6} />
              </Box>
              <VStack align="start" spacing={1}>
                <Heading size="md" fontWeight="bold">
                  {item.title}
                </Heading>
                <Text fontWeight="600" color={useColorModeValue('gray.600', 'gray.400')}>
                  {item.institution}
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
              {item.period}
            </Badge>
          </HStack>

          <HStack justify="space-between" align="center" mt={4} wrap="wrap">
            <HStack spacing={2} color="gray.500" fontSize="sm">
              <Icon as={FaMapMarkerAlt} />
              <Text>{item.location}</Text>
            </HStack>

            {item.certificate && (
              <Button
                size="sm"
                leftIcon={<Icon as={FaFilePdf} />}
                colorScheme="gold"
                variant="outline"
                onClick={() => handleOpenCert(item.certificate!, item.title)}
                _hover={{
                  bg: 'gold.500',
                  color: 'white',
                }}
              >
                Voir le certificat
              </Button>
            )}
          </HStack>
        </Box>
      ))}
    </VStack>
  )

  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="orange" align="center" mt={8}>
        <TabList bg={tabBg} p={1} borderRadius="full" display="inline-flex">
          <Tab
            _selected={{ color: activeTabColor, bg: activeTabBg, boxShadow: 'sm' }}
            fontWeight="600"
            px={8}
          >
            Formations
          </Tab>
          <Tab
            _selected={{ color: activeTabColor, bg: activeTabBg, boxShadow: 'sm' }}
            fontWeight="600"
            px={8}
          >
            Certifications
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            {renderList(educations)}
          </TabPanel>
          <TabPanel px={0}>
            {renderList(certifications)}
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent height="85vh" bg={useColorModeValue('white', 'gray.900')}>
          <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
            Certificat : {selectedTitle}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0} height="100%" bg="gray.100">
            {selectedCert && (
              <iframe
                src={`${selectedCert}#toolbar=0`}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title={`Certificat - ${selectedTitle}`}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FormationList


