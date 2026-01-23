import { ReactElement } from 'react'

export type Formation = {
    title: string
    institution: string
    location: string
    period: string
    description?: string
    certificate?: string
    type: 'Education' | 'Certification'
}

export const Formations: Formation[] = [
    {
        title: 'Certification GenAI - Prompt Engineering (Niveau 1)',
        institution: 'DataScientest',
        location: 'Paris, France',
        period: 'Janvier 2026',
        certificate: '/certification/prompt_engineering_l1.pdf',
        type: 'Certification',
    },
    {
        title: 'Bachelor Développeur en Intelligence Artificielle (En cours)',
        institution: 'ECE LYON',
        location: 'Lyon, France',
        period: 'Septembre 2025 - présent',
        type: 'Education',
    },
    {
        title: 'Diplôme en Génie Logiciel',
        institution: 'Université Nongo Conakry',
        location: 'Conakry',
        period: '2021 - 2025',
        type: 'Education',
    },
    {
        title: 'Attestation en Développement BackEnd avec Spring Boot',
        institution: 'Orange Digital Center',
        location: 'Conakry',
        period: 'Juillet 2024',
        type: 'Certification',
    },
]
