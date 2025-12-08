/* eslint-disable react/no-multi-comp */
import {
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  useColorModeValue,
  Divider,
  Text,
  Box,
  VStack,
  HStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Skill, Skills, splitSkills } from 'config/skills'

type ISkillSetModal = {
  isOpen: boolean
  onClose(): void
}

const MotionListItem = motion(ListItem)

const SkillList = ({
  title,
  columns,
}: {
  title: string
  columns: Skill[][]
}) => {
  const emphasis = useColorModeValue('teal.300', 'gold.300')
  const textColor = 'white'
  const [colOne, colTwo = []] = columns

  return (
    <Box mb={8}>
      <Heading
        as="h3"
        size="sm"
        mb={3}
        color="white"
        textTransform="uppercase"
        letterSpacing="wider"
        fontWeight="bold"
        borderLeft="4px solid"
        borderColor={emphasis}
        pl={3}
      >
        {title}
      </Heading>
      <SimpleGrid columns={2} spacing={6}>
        <List spacing={3}>
          {colOne.map((item, index) => (
            <MotionListItem
              key={item.name}
              fontSize="sm"
              display="flex"
              alignItems="center"
              color={textColor}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ListIcon as={item.icon} color={emphasis} fontSize="xl" mr={3} />
              <Text fontWeight="500">{item.name}</Text>
            </MotionListItem>
          ))}
        </List>
        <List spacing={3}>
          {colTwo.map((item, index) => (
            <MotionListItem
              key={item.name}
              fontSize="sm"
              display="flex"
              alignItems="center"
              color={textColor}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + colOne.length) * 0.05 }}
            >
              <ListIcon as={item.icon} color={emphasis} fontSize="xl" mr={3} />
              <Text fontWeight="500">{item.name}</Text>
            </MotionListItem>
          ))}
        </List>
      </SimpleGrid>
    </Box>
  )
}

const SkillSetModal = ({ isOpen, onClose }: ISkillSetModal) => {
  const bg = useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(0, 0, 0, 0.2)')
  const borderColor = useColorModeValue('rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)')

  const backendCols = splitSkills(Skills.backend)
  const frontendCols = splitSkills(Skills.frontend)
  const cicdCols = splitSkills(Skills.cicd)
  const dataBaseCols = splitSkills(Skills.database)
  const uiFrameWorkCols = splitSkills(Skills['ui frameworks'])
  const productivityCols = splitSkills(Skills['productivity boost'])
  const mobileCols = splitSkills(Skills.mobile)
  const gameCols = splitSkills(Skills.games)
  const desktopCols = splitSkills(Skills.desktop)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
      size="xl"
    >
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent
        bg={bg}
        backdropFilter="blur(20px) saturate(180%)"
        border="1px solid"
        borderColor={borderColor}
        borderRadius="2xl"
        boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
      >
        <ModalHeader
          fontSize="2xl"
          fontWeight="800"
          color="white"
          textAlign="center"
          pt={8}
          pb={2}
        >
          Expertise Technique
          <Text fontSize="sm" fontWeight="normal"  color="white.500" mt={2}>
            Vue d'ensemble de mes compétences
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={{ base: 6, md: 10 }} py={6}>
          <VStack align="stretch" spacing={2}>
            <SkillList title="Backend & Architecture" columns={backendCols} />
            <SkillList title="Frontend & UI" columns={frontendCols} />
            <SkillList title="Frameworks UI" columns={uiFrameWorkCols} />
            <SkillList title="Base de données & Streams" columns={dataBaseCols} />
            <SkillList title="DevOps & CI/CD" columns={cicdCols} />
            <SkillList title="Mobile" columns={mobileCols} />
            <SkillList title="Desktop" columns={desktopCols} />
            <SkillList title="Jeux Vidéo" columns={gameCols} />
            <SkillList title="Outils & Productivité" columns={productivityCols} />
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="center" pb={8}>
          <Text fontSize="xs" color="gray.500" fontStyle="italic">
            * Liste non exhaustive, j'apprends continuellement de nouvelles technologies.
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SkillSetModal
