import { memo } from 'react'
import { Heading, Text, Stack, Link } from '@chakra-ui/react'
import ExperienceTab from './FormationTab'
const DetailSection = () => (
  <Stack
    width={{ base: '99%', lg: '60%', xl: '75%' }}
    height="100%"
    spacing={{ base: 6, xl: 8 }}
    alignItems={{ base: 'center', lg: 'flex-start' }}
    textAlign={{ base: 'center', lg: 'left' }}
  >
    <Heading
      size="2xl"
      style={{
        fontVariantCaps: 'small-caps',
      }}
    >
      Formations & Certifications.
    </Heading>
    <Text variant="description">
      Mon parcours académique et mes certifications qui valident mes compétences techniques.
    </Text>

    <ExperienceTab />
  </Stack>
)

export default memo(DetailSection)
