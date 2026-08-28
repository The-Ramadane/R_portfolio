import { memo } from 'react'
import { useLang } from 'lib/i18n'
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
  const { t } = useLang()

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
        {t.about.heading}
      </Heading>
      <Text variant="description" fontSize="lg" lineHeight="tall" textAlign={{ base: "center", lg: "left" }}>
        {t.about.p1_before}<Tooltip label={t.about.tt_ai} hasArrow><Text as="span" fontWeight="bold">{t.about.p1_ai}</Text></Tooltip>{t.about.p1_mid}<Tooltip label={t.about.tt_soft} hasArrow><Text as="span" fontWeight="bold">{t.about.p1_soft}</Text></Tooltip>{t.about.p1_end}
        <br /> <br />
        {t.about.p2_before}<Tooltip label={t.about.tt_backend} hasArrow><Text as="span" fontWeight="bold" color={emphasis}>{t.about.p2_backend}</Text></Tooltip>{t.about.p2_mid1}<Tooltip label={t.about.tt_mobile} hasArrow><Text as="span" fontWeight="bold" color={emphasis}>{t.about.p2_mobile}</Text></Tooltip>{t.about.p2_mid2}<Tooltip label={t.about.tt_fullstack} hasArrow><Text as="span" fontWeight="bold" color={emphasis}>{t.about.p2_fullstack}</Text></Tooltip>{t.about.p2_mid3}<Tooltip label={t.about.tt_ml} hasArrow><Text as="span" fontWeight="bold">{t.about.p2_ml}</Text></Tooltip>{t.about.p2_end}
        <br /> <br />
        {t.about.p3_before}<Tooltip label={t.about.tt_lpo} hasArrow><Text as="span" fontWeight="bold">{t.about.p3_lpo}</Text></Tooltip>{t.about.p3_mid}<Tooltip label={t.about.tt_ece} hasArrow><Text as="span" fontWeight="bold">{t.about.p3_ece}</Text></Tooltip>{t.about.p3_end}
        <br /> <br />
        {t.about.p4}
      </Text>

      <Heading
        as="h4"
        size="lg"
        letterSpacing="tight"
        fontWeight="700"
        color={useColorModeValue('gray.900', 'white')}
        textAlign={{ base: 'center', lg: 'left' }}
        mt={4}
        mb={2}
      >
        {t.about.interests_heading}
      </Heading>
      <Text variant="description" fontSize="lg" lineHeight="tall" textAlign={{ base: "center", lg: "left" }} mb={6}>
        {t.about.interests_desc}
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
          {t.about.cta} <Icon as={IoMdOpen} />
        </Text>
      </Box>
    </Stack>
  )
}

export default memo(Detail)
