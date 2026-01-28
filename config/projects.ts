export type Project = {
    title: string
    role: string
    description: string
    technologies: string[]
    image: string
    url?: string
}

export const Projects: Project[] = [
    {
        title: 'Lyon Tech - Site Vitrine',
        role: 'Développeur Web & Déploiement',
        description: "Création et déploiement du site vitrine de l'association Lyon Tech. Responsable de la majeure partie du développement (HTML, CSS) et de l'hébergement sur Firebase.",
        technologies: ['HTML', 'CSS', 'Firebase'],
        image: '/logo_asso.jpg',
        url: 'https://site-lyon-tech.web.app',
    },
    {
        title: 'Plateforme de gestion de soutenance (PFE)',
        role: 'Full-Stack',
        description: "Conception d'une application pour la gestion des soutenances, incluant la mise en place de l'authentification.",
        technologies: ['Spring Boot', 'Angular', 'PostgreSQL'],
        image: '/works/pfe.png', // Placeholder, will need to be added or handled
        url: '#',
    },
    {
        title: 'ePharma',
        role: 'Backend',
        description: "Conception et développement d'une plateforme de gestion de pharmacie (travail en équipe).",
        technologies: ['Spring Boot'],
        image: '/works/epharma.png', // Placeholder
        url: '#',
    },
    {
        title: 'Sagitech',
        role: 'Conception & Développement',
        description: "Plateforme intégrée pour le Ministère de la Santé (Guinée) : gestion des financements, du PNDS, des structures d'exécution et tableaux de bord stratégiques pour une gouvernance optimisée.",
        technologies: ['Spring Boot', 'Angular', 'PostgreSQL'],
        image: '/works/sagitech.png',
        url: 'https://www.linkedin.com/in/alpha947/details/projects/406839056/multiple-media-viewer?profileId=ACoAADNPtaEBA2C-jA6Bd4McmDl8cxaxH67X_VM&treasuryMediaId=1767785882190&type=IMAGE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_media_list_details_modal%3BFRBPy%2F24QGCcx1bYM9JC%2Bw%3D%3D',
    },
]
