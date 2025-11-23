import { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    Heading,
    useToast,
    Spinner,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const EditPost = () => {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const { id } = router.query
    const toast = useToast()

    useEffect(() => {
        if (id) {
            fetch(`/api/posts/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        toast({ title: 'Post not found', status: 'error' })
                        router.push('/admin')
                        return
                    }
                    setTitle(data.title)
                    setSlug(data.slug)
                    setDescription(data.description || '')
                    setContent(data.content)
                    setTags(data.tags || '')
                    setCoverImage(data.cover_image || '')
                    setIsLoading(false)
                })
                .catch(() => {
                    toast({ title: 'Failed to load post', status: 'error' })
                    setIsLoading(false)
                })
        }
    }, [id, router, toast])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const token = localStorage.getItem('admin_token')

        const res = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                slug,
                description,
                content,
                tags,
                cover_image: coverImage,
            }),
        })

        if (res.ok) {
            toast({
                title: 'Post updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            router.push('/admin')
        } else {
            toast({
                title: 'Failed to update post.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <Container centerContent py={20}>
                <Spinner size="xl" />
            </Container>
        )
    }

    return (
        <Container maxW="container.md" py={10} mt={20}>
            <Heading mb={6}>Edit Post</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl id="title" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                    </FormControl>

                    <FormControl id="slug" isRequired>
                        <FormLabel>Slug</FormLabel>
                        <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
                    </FormControl>

                    <FormControl id="description">
                        <FormLabel>Description (Excerpt)</FormLabel>
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </FormControl>

                    <FormControl id="cover_image">
                        <FormLabel>Cover Image URL</FormLabel>
                        <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
                    </FormControl>

                    <FormControl id="tags">
                        <FormLabel>Tags (comma separated)</FormLabel>
                        <Input value={tags} onChange={(e) => setTags(e.target.value)} />
                    </FormControl>

                    <FormControl id="content" isRequired>
                        <FormLabel>Content (Markdown)</FormLabel>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            height="400px"
                            fontFamily="monospace"
                        />
                    </FormControl>

                    <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                        Update Post
                    </Button>
                </VStack>
            </form>
        </Container>
    )
}

export default EditPost
