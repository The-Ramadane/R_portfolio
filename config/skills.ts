import { IconType } from 'react-icons'
import {
    SiJavascript,
    SiTypescript,
    SiNodedotjs,
    SiReact,
    SiNextdotjs,
    SiDocker,
    SiPostgresql,
    SiMysql,
    SiMongodb,
    SiPython,
    SiGit,
    SiGithub,
    SiPostman,
    SiLinux,
    SiHtml5,
    SiCss3,
    SiTailwindcss,
    SiFramer,
    SiSpringboot,
    SiFastapi,
    SiNestjs,
    SiAngular,
    SiSwagger,
    SiTensorflow,
    SiPytorch,
    SiScikitlearn,
    SiJupyter,
    SiFirebase,
    SiExpress,
    SiShadcnui,
    SiHuggingface,
    SiPrisma,
} from 'react-icons/si'
import { FaJava, FaRobot, FaBrain } from 'react-icons/fa'
import { TbBrandReactNative } from 'react-icons/tb'
import { VscTerminalBash } from 'react-icons/vsc'

export type Skill = {
    name: string
    icon: IconType
}

export const splitSkills = (srcArray: Skill[]) => {
    const arrLength = srcArray.length
    const isEvenChunk = arrLength % 2 === 0

    let chunk = 4
    if (isEvenChunk) {
        chunk = arrLength / 2
    } else if (arrLength <= 5 && arrLength > 0) {
        chunk = 3
    }

    let i = 0
    let j = 0
    const temporary = []
    for (i = 0, j = srcArray.length; i < j; i += chunk) {
        temporary.push(srcArray.slice(i, i + chunk))
    }
    return temporary
}

export const Skills = {
    // Pilier 1 — IA & MLOps
    ai_mlops: [
        { name: 'PyTorch', icon: SiPytorch },
        { name: 'MLflow', icon: SiScikitlearn },
        { name: 'Hugging Face (BERT)', icon: SiHuggingface },
        { name: 'scikit-learn', icon: SiScikitlearn },
        { name: 'YOLO / ResNet', icon: FaRobot },
        { name: 'Gemini / OpenAI API', icon: FaBrain },
        { name: 'TensorFlow', icon: SiTensorflow },
        { name: 'Jupyter', icon: SiJupyter },
    ],
    // Pilier 2 — Backend & Système
    backend_system: [
        { name: 'Python (FastAPI)', icon: SiFastapi },
        { name: 'TypeScript (NestJS)', icon: SiNestjs },
        { name: 'Java (Spring Boot)', icon: SiSpringboot },
        { name: 'Express.js', icon: SiExpress },
        { name: 'C (Bas niveau)', icon: FaRobot },
        { name: 'Linux / Bash', icon: SiLinux },
        { name: 'Swagger / Postman', icon: SiSwagger },
    ],
    // Pilier 3 — Frontend & Mobile
    frontend_mobile: [
        { name: 'Next.js (App Router)', icon: SiNextdotjs },
        { name: 'React', icon: SiReact },
        { name: 'React Native', icon: TbBrandReactNative },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
        { name: 'shadcn/ui', icon: SiShadcnui },
        { name: 'Angular', icon: SiAngular },
        { name: 'HTML5 / CSS3', icon: SiHtml5 },
    ],
    // Pilier 4 — Data & DevOps
    data_devops: [
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'Prisma ORM', icon: SiPrisma },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'MySQL', icon: SiMysql },
        { name: 'Docker / Compose', icon: SiDocker },
        { name: 'Git / GitHub', icon: SiGithub },
        { name: 'Firebase', icon: SiFirebase },
        { name: 'JavaScript', icon: SiJavascript },
    ],
    // Langages (gardé pour la vue legacy)
    languages: [
        { name: 'Python', icon: SiPython },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'Java', icon: FaJava },
        { name: 'JavaScript', icon: SiJavascript },
    ],
    ai_assistants: [
        { name: 'Windsurf', icon: FaRobot },
        { name: 'Claude Code', icon: FaBrain },
        { name: 'Antigravity', icon: FaRobot },
        { name: 'Google Jules', icon: FaBrain },
    ],
}
