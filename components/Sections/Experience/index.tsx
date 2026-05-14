import { memo } from 'react'
import { Heading, Text, Stack, Link } from '@chakra-ui/react'
import ExperienceTab from './ExperienceTab'
import { useLang } from 'lib/i18n'
const DetailSection = () => {
  const { t } = useLang()
  return (
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
        {t.experience.heading}
      </Heading>
      <Text variant="description">
        {t.experience.description}
      </Text>

      <ExperienceTab />
    </Stack>
  )
}

export default memo(DetailSection)
