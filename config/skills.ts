import { IconType } from 'react-icons'
import {
    SiDotnet,
    SiJavascript,
    SiTypescript,
    SiNodedotjs,
    SiGraphql,
    SiReact,
    SiNextdotjs,
    SiDocker,
    SiPostgresql,
    SiMysql,
    SiMongodb,
    SiRedis,
    SiPython,
    SiGit,
    SiGithub,
    SiPostman,
    SiFigma,
    SiAndroid,
    SiIos,
    SiUnity,
    SiUnrealengine,
    SiElectron,

    SiKotlin,
    SiSwift,
    SiRust,
    SiKubernetes,
    SiAmazon,
    SiGooglecloud,
    SiSlack,
    SiNotion,
    SiLinux,
    SiHtml5,
    SiCss3,
    SiTailwindcss,
    SiMui,
    SiChakraui,
    SiFramer,
    SiSpringboot,
    SiFastapi,
    SiAngular,
    SiSwagger,
    SiTensorflow,
    SiPytorch,
    SiScikitlearn,
    SiJupyter,
    SiFirebase,
    SiExpress,
    SiShadcnui,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

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
    languages: [
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'Java', icon: FaJava },
        { name: 'Python', icon: SiPython },
    ],
    backend: [
        { name: 'Spring Boot', icon: SiSpringboot },
        { name: 'FastAPI', icon: SiFastapi },
        { name: 'Express.js', icon: SiExpress },
        { name: 'Firebase', icon: SiFirebase },
    ],
    frontend: [
        { name: 'Angular', icon: SiAngular },
        { name: 'React', icon: SiReact },
        { name: 'Next.js', icon: SiNextdotjs },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
        { name: 'shadcn/ui', icon: SiShadcnui },
        { name: 'HTML5', icon: SiHtml5 },
        { name: 'CSS3', icon: SiCss3 },
    ],
    mobile: [
        { name: 'React Native', icon: SiReact },
    ],
    database: [
        { name: 'MySQL', icon: SiMysql },
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'Redis', icon: SiRedis },
    ],
    tools: [
        { name: 'Postman', icon: SiPostman },
        { name: 'Swagger', icon: SiSwagger },
        { name: 'Git', icon: SiGit },
        { name: 'GitHub', icon: SiGithub },
        { name: 'Docker', icon: SiDocker },
        { name: 'Kubernetes', icon: SiKubernetes },
    ],
    ai: [
        { name: 'Machine Learning', icon: SiScikitlearn },
        { name: 'Data Science', icon: SiJupyter },
        { name: 'TensorFlow', icon: SiTensorflow },
        { name: 'PyTorch', icon: SiPytorch },
    ],
}
