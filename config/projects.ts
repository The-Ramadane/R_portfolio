export type Project = {
    title: string
    role: string
    description: string
    technologies: string[]
    image: string
    url?: string
    githubUrl?: string
    highlight?: boolean
}

export const Projects: Project[] = [
    {
        title: 'Emotion API',
        role: 'NLP, MLOps & Backend',
        description: "API REST (FastAPI) pour la classification de texte. Mise en production d'un modèle BERT fine-tuné (PyTorch / Hugging Face) versionné et suivi via MLflow, couplé à un pipeline comparatif utilisant un LLM (Google Gemini) pour évaluer la précision et calculer les coûts d'inférence en temps réel.",
        technologies: ['Python', 'FastAPI', 'PyTorch', 'Hugging Face', 'BERT', 'MLflow', 'Gemini API', 'Docker'],
        image: '/works/agora.png',
        url: '#',
        githubUrl: '#',
        highlight: true,
    },
    {
        title: 'Smart Recycle',
        role: 'Computer Vision & Full-Stack',
        description: "Application complète de classification automatisée des déchets avec gamification. Pipeline Computer Vision combinant détection/classification via YOLO & ResNet50 fine-tuné sous PyTorch, suivis avec MLflow. API d'inférence FastAPI conteneurisée avec Docker, interface Next.js et base de données PostgreSQL via Prisma ORM.",
        technologies: ['Python', 'FastAPI', 'PyTorch', 'YOLOv11', 'ResNet50', 'MLflow', 'Next.js', 'PostgreSQL', 'Prisma', 'Docker'],
        image: '/works/prot_kyc01.png',
        url: '#',
        githubUrl: '#',
    },
    {
        title: 'ePharma & Sagitech',
        role: 'Backend & Architecture',
        description: "Conception en équipe d'une API de gestion de pharmacie (stocks, ventes, inventaire) et d'un système d'authentification sécurisé. Architecture backend robuste avec Java Spring Boot, interface Angular et base de données PostgreSQL.",
        technologies: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL'],
        image: '/works/epharma.png',
        url: '#',
        githubUrl: '#',
    },
    {
        title: 'Plateforme de gestion de soutenance (PFE)',
        role: 'Full-Stack',
        description: "Conception et développement d'une application web pour la gestion complète des soutenances de fin d'études, incluant la mise en place de l'authentification, la gestion des utilisateurs et le suivi des dossiers.",
        technologies: ['Spring Boot', 'Angular', 'PostgreSQL'],
        image: '/works/pfe.png',
        url: '#',
    },
    {
        title: 'Lyon Tech - Site Vitrine',
        role: 'Développeur Web & Déploiement',
        description: "Création et déploiement du site vitrine de l'association Lyon Tech. Responsable de la majeure partie du développement (HTML, CSS) et de l'hébergement sur Firebase.",
        technologies: ['HTML', 'CSS', 'Firebase'],
        image: '/logo_asso.jpg',
        url: 'https://site-lyon-tech.web.app',
    },
]
