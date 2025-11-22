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
    SiFlutter,
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
    backend: [
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'C# - .NET Core', icon: SiDotnet },
        { name: 'Python', icon: SiPython },
        { name: 'Java', icon: FaJava },
        { name: 'GraphQL', icon: SiGraphql },
    ],
    frontend: [
        { name: 'React', icon: SiReact },
        { name: 'Next.js', icon: SiNextdotjs },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'HTML5', icon: SiHtml5 },
        { name: 'CSS3', icon: SiCss3 },
    ],
    database: [
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'MySQL', icon: SiMysql },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'Redis', icon: SiRedis },
    ],
    cicd: [
        { name: 'Docker', icon: SiDocker },
        { name: 'Kubernetes', icon: SiKubernetes },
        { name: 'AWS', icon: SiAmazon },
        { name: 'GCP', icon: SiGooglecloud },
        { name: 'Git', icon: SiGit },
        { name: 'GitHub', icon: SiGithub },
    ],
    'ui frameworks': [
        { name: 'Chakra UI', icon: SiChakraui },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
        { name: 'Material UI', icon: SiMui },
        { name: 'Framer Motion', icon: SiFramer },
        { name: 'Figma', icon: SiFigma },
    ],
    'productivity boost': [
        { name: 'Postman', icon: SiPostman },
        { name: 'Notion', icon: SiNotion },
        { name: 'Slack', icon: SiSlack },
    ],
    mobile: [
        { name: 'React Native', icon: SiReact },
        { name: 'Flutter', icon: SiFlutter },
        { name: 'Android', icon: SiAndroid },
        { name: 'iOS', icon: SiIos },
        { name: 'Kotlin', icon: SiKotlin },
        { name: 'Swift', icon: SiSwift },
    ],
    games: [
        { name: 'Unity', icon: SiUnity },
        { name: 'Unreal Engine', icon: SiUnrealengine },
    ],
    desktop: [
        { name: 'Electron', icon: SiElectron },
        { name: 'Tauri', icon: SiRust },
    ],
}
