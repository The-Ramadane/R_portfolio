import { Link } from '@chakra-ui/react'
import { ReactElement } from 'react'

export type Company = 'SPA' | 'LyonTech'

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
  LyonTech: {
    name: 'Lyon Tech',
    longName: 'Association Lyon Tech',
    subDetail: 'Lyon, France',
    url: 'https://site-lyon-tech.web.app',
    position: 'Membre actif & Développeur Web',
    duration: 'Septembre 2025 - Présent', // Assuming school year start
    logo: {
      light: '/logo_asso.jpg',
      dark: '/logo_asso.jpg',
    },
    roles: [
      <>
        Développement intégral du site vitrine de l'association (HTML, CSS, Firebase) en équipe réduite.
      </>,
      <>
        Participation aux activités et événements de l'association.
      </>,
    ],
  },
}

export const ExperiencesList = [
  Experiences.LyonTech,
  Experiences.SPA,
]
