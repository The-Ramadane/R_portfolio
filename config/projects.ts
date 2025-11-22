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
