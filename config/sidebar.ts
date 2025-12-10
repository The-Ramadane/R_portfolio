import { IconType } from 'react-icons'
import {
  FaInstagram,
  FaLinkedin,
  FaStackOverflow,
  FaTwitter,
  FaYoutube,
  FaGithub,
  FaDev,
} from 'react-icons/fa'

type SocialMedia = {
  label: string
  href: string
  icon: IconType
}

export const SocialMedias: SocialMedia[] = [
  
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ramadane_diallo_?igsh=MWo5bXZoamsyMjI1Yg%3D%3D&utm_source=qr',
    icon: FaInstagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mouhammadou-ramadane-diallo-32a36b2b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    icon: FaLinkedin,
  },
  
  {
    label: 'Github',
    href: 'https://github.com/The-Ramadane',
    icon: FaGithub,
  },
]
