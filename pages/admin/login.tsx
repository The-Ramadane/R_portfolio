import { useState } from 'react'
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    useToast,
    useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const toast = useToast()
    const bg = useColorModeValue('white', 'gray.700')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            const data = await res.json()

            if (res.ok) {
                localStorage.setItem('admin_token', data.token)
                toast({
                    title: 'Login successful',
                    status: 'success',
                    duration: 3000,
                })
                router.push('/admin')
            } else {
                toast({
                    title: 'Login failed',
                    description: data.error,
                    status: 'error',
                    duration: 3000,
                })
            }
        } catch (error) {
            toast({
                title: 'An error occurred',
                status: 'error',
                duration: 3000,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container maxW="container.sm" py={20} centerContent>
            <Box
                p={8}
                maxWidth="500px"
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
                bg={bg}
                w="100%"
            >
                <Heading mb={6} textAlign="center">Admin Login</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            colorScheme="teal"
                            width="full"
                            isLoading={isLoading}
                        >
                            Sign In
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Container>
    )
}

export default Login
