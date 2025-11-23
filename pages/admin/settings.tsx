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
import { useEffect } from 'react'

const Settings = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const toast = useToast()
    const bg = useColorModeValue('white', 'gray.700')

    useEffect(() => {
        const token = localStorage.getItem('admin_token')
        if (!token) {
            router.push('/admin/login')
        }
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                status: 'error',
                duration: 3000,
            })
            return
        }

        setIsLoading(true)
        const token = localStorage.getItem('admin_token')

        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            })

            const data = await res.json()

            if (res.ok) {
                toast({
                    title: 'Password updated',
                    status: 'success',
                    duration: 3000,
                })
                setOldPassword('')
                setNewPassword('')
                setConfirmPassword('')
            } else {
                toast({
                    title: 'Update failed',
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
                <Heading mb={6} textAlign="center">Change Password</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl id="oldPassword">
                            <FormLabel>Old Password</FormLabel>
                            <Input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="newPassword">
                            <FormLabel>New Password</FormLabel>
                            <Input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="confirmPassword">
                            <FormLabel>Confirm New Password</FormLabel>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            colorScheme="teal"
                            width="full"
                            isLoading={isLoading}
                        >
                            Update Password
                        </Button>
                        <Button
                            variant="ghost"
                            width="full"
                            onClick={() => router.push('/admin')}
                        >
                            Back to Dashboard
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Container>
    )
}

export default Settings
