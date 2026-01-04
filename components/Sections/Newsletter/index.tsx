import { memo, useState } from 'react'
import { RiHeartPulseFill,  RiGithubFill } from 'react-icons/ri'

import {
    Heading,
    Text,
    Stack,
    Input,
    Button,
    useToast,
    InputGroup,
    InputRightElement,
    useColorModeValue,
    Container,
    Icon,
    Link,
    Box,
} from '@chakra-ui/react'
import { subscribeToNewsletter } from 'lib/newsletter'
import { RiCopyleftLine, RiSendPlaneFill } from 'react-icons/ri'

const Newsletter = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const bg = useColorModeValue('gray.50', 'whiteAlpha.50')
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await subscribeToNewsletter(email)
            toast({
                title: 'Subscription successful!',
                description: "You've proven you have subscribed to the newsletter.",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom-right',
            })
            setEmail('')
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-right',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container maxW="container.md" p={0}>
            <Stack
                width="100%"
                spacing={8}
                alignItems="center"
                textAlign="center"
                bg={bg}
                p={8}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
            >
                <Stack spacing={3}>
                    <Heading size="lg">Join the Newsletter</Heading>
                    <Text color="gray.500">
                        Get the latest updates on my projects, articles, and tech insights directly to your inbox.
                        No spam, just code.
                    </Text>
                </Stack>

                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                    <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
                        <InputGroup size="md">
                            <Input
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                bg={useColorModeValue('white', 'gray.800')}
                                _placeholder={{ color: 'gray.400' }}
                            />
                        </InputGroup>
                        <Button
                            colorScheme="teal"
                            isLoading={isLoading}
                            type="submit"
                            rightIcon={<RiSendPlaneFill />}
                            minW="120px"
                        >
                            Subscribe
                        </Button>
                    </Stack>
                </form>

                
            </Stack>
            
        </Container>
    )
}

export default memo(Newsletter)
