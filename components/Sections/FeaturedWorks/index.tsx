import { memo } from 'react'
import {
  Heading,
  Text,
  Stack,
  Grid,
  GridItem,
  useBreakpointValue,
  Box,
  Badge,
  HStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import FeaturedCard from './FeaturedCard'
import { fadeInUpSlower, galleryStagger } from 'config/animations'
import { mobileBreakpointsMap } from 'config/theme'
import { Projects } from 'config/projects'

const MotionGrid = motion(Grid)
const MotionGridItem = motion(GridItem)

const FeaturedWorksSection = () => {
  const isMobile = useBreakpointValue(mobileBreakpointsMap)
  return (
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
        Projets Réalisés.
      </Heading>
      <Text variant="description">
        Une sélection de projets techniques sur lesquels j'ai travaillé, démontrant mes compétences en développement Full-Stack et Backend.
      </Text>

      <MotionGrid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={{ base: 5, md: 6 }}
        variants={galleryStagger}
      >
        {Projects.map((project, idx) => (
          <MotionGridItem colSpan={6} variants={fadeInUpSlower} key={idx}>
            <FeaturedCard
              idx={idx}
              title={project.title}
              src={project.image}
              description={
                <Box>
                  <Text mb={2}>{project.description}</Text>
                  <Text fontSize="sm" fontWeight="bold" mb={1}>Rôle: <Text as="span" fontWeight="normal">{project.role}</Text></Text>
                  <HStack spacing={2} mt={2} wrap="wrap">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} colorScheme="teal" variant="subtle">
                        {tech}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              }
              height={{ base: '130px', md: '225px', '2xl': '300px' }}
              ctaUrl={project.url || '#'}
              isMobile={isMobile}
            />
          </MotionGridItem>
        ))}
      </MotionGrid>
    </Stack>
  )
}

export default memo(FeaturedWorksSection)
