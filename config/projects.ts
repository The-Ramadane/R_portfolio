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
        title: 'Sagtech',
        role: 'Backend',
        description: "Implémentation de modules de reporting et gestion des activités stratégiques et prioritaires (travail en équipe).",
        technologies: ['Spring Boot'],
        image: '/works/sagtech.png', // Placeholder
        url: '#',
    },
]
