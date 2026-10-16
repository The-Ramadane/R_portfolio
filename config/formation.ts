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
        title: 'Cycle Ingénieur en Informatique (Majeure Développement & IA)',
        institution: 'EPITA',
        location: 'Lyon, France',
        period: 'Septembre 2026 – Présent (2029)',
        description: 'Programmation bas niveau (C, Unix/Shell), algorithmique avancée, structures de données, réseaux, probabilités et ingénierie logicielle.',
        type: 'Education',
    },
    {
        title: 'Bachelor 3 Intelligence Artificielle & Data',
        institution: 'ECE Lyon',
        location: 'Lyon, France',
        period: 'Septembre 2025 – Août 2026',
        description: 'Machine Learning, Deep Learning, Computer Vision, Data Mining, Probabilités & Statistiques.',
        type: 'Education',
    },
    {
        title: 'Certification GenAI - Prompt Engineering (Niveau 1)',
        institution: 'DataScientest',
        location: 'Paris, France',
        period: 'Janvier 2026',
        certificate: '/certification/prompt_engineering_l1.pdf',
        type: 'Certification',
    },
    {
        title: 'Attestation en Développement BackEnd avec Spring Boot',
        institution: 'Orange Digital Center',
        location: 'Conakry',
        period: 'Juillet 2024',
        type: 'Certification',
    },
    {
        title: 'Licence en Génie Logiciel',
        institution: 'Université Nongo Conakry',
        location: 'Conakry, Guinée',
        period: '2021 – 2025',
        type: 'Education',
    },
    {
        title: 'Baccalauréat Scientifique',
        institution: 'Hamdallaye Secondaire',
        location: 'Conakry, Guinée',
        period: '2021',
        type: 'Education',
    },
]
