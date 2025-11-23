import { memo } from 'react'
import { Heading, Text, Stack, Link } from '@chakra-ui/react'
import ExperienceTab from './ExperienceTab'
const DetailSection = () => (
  <Stack
    width={{ base: '99%', lg: '60%', xl: '75%' }}
    height="100%"
    spacing={{ base: 6, xl: 8 }}
  >
    <Heading
      size="2xl"
      style={{
        fontVariantCaps: 'small-caps',
      }}
    >
      Expérience Professionnelle.
    </Heading>
    <Text variant="description">
      Mon expérience professionnelle où j'ai pu mettre en pratique mes compétences et apporter de la valeur.
    </Text>

    <ExperienceTab />
  </Stack>
)

export default memo(DetailSection)
