import { Box, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    alpha: number
    targetAlpha: number
}

const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const bg = useColorModeValue('#F7FAFC', '#111111') // Gray.50 / Dark Gray
    const particleColor = useColorModeValue('214, 158, 46', '236, 201, 75') // Gold.500 / Gold.300

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []
        let width = window.innerWidth
        let height = window.innerHeight

        // Mouse state
        let mouseX = 0
        let mouseY = 0
        let isMouseMoving = false
        let mouseTimeout: NodeJS.Timeout

        const init = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height

            // Create particles
            const particleCount = Math.min(Math.floor((width * height) / 15000), 150)
            particles = []

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: -(Math.random() * 0.5 + 0.2), // Always moving up (Antigravity)
                    size: Math.random() * 2 + 1,
                    alpha: Math.random() * 0.5,
                    targetAlpha: Math.random() * 0.5
                })
            }
        }

        const handleResize = () => {
            init()
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            isMouseMoving = true

            clearTimeout(mouseTimeout)
            mouseTimeout = setTimeout(() => {
                isMouseMoving = false
            }, 2000)
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height)

            particles.forEach((p) => {
                // Update position
                p.x += p.vx
                p.y += p.vy

                // Antigravity reset
                if (p.y < -10) {
                    p.y = height + 10
                    p.x = Math.random() * width
                }

                // Horizontal wrap
                if (p.x < -10) p.x = width + 10
                if (p.x > width + 10) p.x = -10

                // Mouse interaction (Repulsion)
                if (isMouseMoving) {
                    const dx = p.x - mouseX
                    const dy = p.y - mouseY
                    const distance = Math.sqrt(dx * dx + dy * dy)
                    const maxDistance = 200

                    if (distance < maxDistance) {
                        const force = (maxDistance - distance) / maxDistance
                        const angle = Math.atan2(dy, dx)

                        p.vx += Math.cos(angle) * force * 0.5
                        p.vy += Math.sin(angle) * force * 0.5
                    }
                }

                // Friction to return to normal speed
                p.vx *= 0.98
                p.vy = p.vy * 0.98 - 0.005 // Tend back to upward float

                // Cap speed
                if (p.vy < -2) p.vy = -2
                if (p.vy > 1) p.vy = 1

                // Twinkle effect
                if (Math.random() > 0.95) {
                    p.targetAlpha = Math.random() * 0.6 + 0.1
                }
                p.alpha += (p.targetAlpha - p.alpha) * 0.05

                // Draw
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`
                ctx.fill()
            })

            // Draw connecting lines for nearby particles
            ctx.lineWidth = 0.5
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 100) {
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        const opacity = (1 - distance / 100) * 0.15
                        ctx.strokeStyle = `rgba(${particleColor}, ${opacity})`
                        ctx.stroke()
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw)
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)

        init()
        draw()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
            clearTimeout(mouseTimeout)
        }
    }, [particleColor])

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={-1}
            bg={bg}
            style={{
                transition: 'background-color 0.2s ease-in-out'
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%'
                }}
            />
        </Box>
    )
}

export default AnimatedBackground
