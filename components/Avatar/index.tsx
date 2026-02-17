import {
  Box,
  Image as ChkImage,
  Text,
  Link,
  SkeletonCircle,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { avatarAnimation } from 'config/animations'

const AvatarImages = {
  DarkMode: '/ramadane_2026.jpeg',
  LightMode: '/ramadane_2026.jpeg',
}

declare global {
  interface Window {
    preloadedPictures?: HTMLImageElement[]
  }
}

const Avatar = () => {
  const MotionBox = motion(Box)
  const imgAvatar = useColorModeValue(
    AvatarImages.LightMode,
    AvatarImages.DarkMode
  )
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  useEffect(() => {
    // Some nice preloading and caching
    const images = [AvatarImages.DarkMode, AvatarImages.LightMode]
    const preloadedImages = images.map((imageSrc) => {
      const img = new Image()
      img.src = imageSrc
      return img
    })
    window.preloadedPictures = preloadedImages
  }, [])
  return (
    <AnimatePresence>
      <MotionBox
        id="klAvatar"
        width={{ base: 'auto', lg: '300px' }}
        height={{ base: 'auto', lg: '450px' }}
        display="flex"
        justifyContent="center"
        padding={{ base: 8 }}
        marginBottom={{ base: 10, md: 10, lg: 0 }}
        initial="initial"
        animate={'animate'}
        variants={avatarAnimation}
        exit={{ opacity: 0 }}
      >
        <ChkImage
          src={imgAvatar}
          alt="Ramadane Avatar"
          htmlWidth="300"
          htmlHeight="450"
          margin="auto"
          borderRadius="3xl"
          objectFit="cover"
          width={{ base: '250px', lg: '300px' }}
          height={{ base: '350px', lg: '450px' }}
          boxShadow="2xl"
          fallback={<SkeletonCircle height="100%" width="100%" />}
        />
      </MotionBox>
    </AnimatePresence>
  )
}

export default Avatar
