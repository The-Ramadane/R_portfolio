import { Link } from '@chakra-ui/react'
import { ReactElement } from 'react'

export type Company = 'SPA'

export type CompanyDetail = {
  name: string
  longName: string
  subDetail?: string
  url: string
  position: string
  duration: string
  logo: {
    light: string
    dark?: string
  }
  roles?: ReactElement[]
}

export const Experiences: {
  [key in Company]: CompanyDetail
} = {
  SPA: {
    name: 'SPA Technology',
    longName: 'SPA Technology',
    subDetail: 'Conakry, Guinée',
    url: 'https://spa-dev.com/',
    position: 'Stagiaire en développement',
    duration: 'Juin 2024 – Octobre 2024',
    logo: {
      light: '/worked_at_logos/spa/spa_logo.png',
      dark: '/worked_at_logos/spa/spa_logo.png',
    },
    roles: [
      <>
        Participation à la conception et à l'implémentation de fonctionnalités clés pour les produits logiciels de l'entreprise.
      </>,
    ],
  },
}

export const ExperiencesList = [
  Experiences.SPA,
]
