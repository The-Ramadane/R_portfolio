import { Link } from '@chakra-ui/react'
import { ReactElement } from 'react'

export type Company = 'SPA' | 'LyonTech' | 'LPO'

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
  LPO: {
    name: 'LPO AuRA',
    longName: 'LPO Auvergne-Rhône-Alpes',
    subDetail: 'Lyon, France',
    url: 'https://auvergne-rhone-alpes.lpo.fr/',
    position: 'Développeur Full-Stack & Mobile (Stage)',
    duration: 'Avril 2026 – Août 2026',
    logo: {
      light: '/worked_at_logos/lpo/lpo_logo.png',
      dark: '/worked_at_logos/lpo/lpo_logo.png',
    },
    roles: [
      <>
        Refonte d'architecture & ingénierie logicielle : pilotage de la modernisation d'un écosystème applicatif complet (application mobile React Native & backoffice Next.js).
      </>,
      <>
        Méthodologie Agile & coordination : sprints, spécifications fonctionnelles et échanges constants avec les équipes terrain et utilisateurs finaux.
      </>,
      <>
        Exigences de production & Clean Code : conteneurisation Docker, sécurisation des API REST, refonte de code legacy et optimisation des performances.
      </>,
    ],
  },
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
        Conception et développement de sites et applications web, incluant l'utilisation de l'architecture MVC avec PHP.
      </>,
      <>
        Développement d'APIs backend robustes en utilisant le framework Spring Boot.
      </>,
      <>
        Déploiement et configuration d'applications web sur des serveurs en ligne.
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
        Développement intégral et maintenance du site vitrine de l'association (HTML, CSS, Firebase).
      </>,
      <>
        Collaboration technique efficace au sein d'une équipe réduite pour le suivi du projet.
      </>,
      <>
        Participation active à l'organisation et à la logistique des événements de l'association.
      </>,
    ],
  },
}

export const ExperiencesList = [
  Experiences.LPO,
  Experiences.LyonTech,
  Experiences.SPA,
]
