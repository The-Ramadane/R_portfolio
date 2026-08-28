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
        title: 'Cycle ingénieur (Ing1)',
        institution: 'EPITA',
        location: 'Lyon, France',
        period: 'Septembre 2026 - présent',
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
    {
        title: 'Baccalauréat Scientifique',
        institution: 'Hamdallaye Secondaire',
        location: 'Conakry, Guinée',
        period: '2021',
        type: 'Education',
    },
]
