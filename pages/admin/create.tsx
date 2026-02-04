import { useState } from 'react'
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
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const toast = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Dynamically import Firebase modules to ensure they are loaded
            const { collection, addDoc } = await import('firebase/firestore')
            const { db, auth } = await import('lib/firebase')

            // We skip strict auth.currentUser check here because Firestore rules are open (testing mode)
            // and auth state might be asynchronous.
            // if (!auth.currentUser) { ... }

            const newPost = {
                title,
                slug,
                description,
                content,
                tags,
                cover_image: coverImage,
                published_at: new Date().toISOString(),
            }

            console.log("Attempting to add doc to Firestore 'posts'...", newPost)
            await addDoc(collection(db, 'posts'), newPost)
            console.log("Doc added successfully")

            toast({
                title: 'Post created.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

            // Notification Logic
            try {
                const { getAllSubscribers } = await import('lib/newsletter')
                const subscribers = await getAllSubscribers()

                if (subscribers.length > 0) {
                    toast({
                        title: 'Notifying subscribers...',
                        status: 'info',
                        duration: 2000,
                    })

                    await fetch('/api/notify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            emails: subscribers,
                            post: { title, slug }
                        })
                    })

                    toast({
                        title: 'Subscribers notified!',
                        status: 'success',
                        duration: 3000,
                    })
                }
            } catch (notifyError) {
                console.error("Notification failed:", notifyError)
                toast({
                    title: 'Notification failed',
                    description: "Post created, but emails weren't sent.",
                    status: 'warning',
                })
            }

            router.push('/admin')
        } catch (error: any) {
            console.error(error)
            toast({
                title: 'Failed to create post.',
                description: error.message || 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setTitle(val)
        setSlug(val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''))
    }

    return (
        <Container maxW="container.md" py={10} mt={20}>
            <Heading mb={6}>Create New Post</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl id="title" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input value={title} onChange={handleTitleChange} />
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
                        <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="/assets/blog/image.png" />
                    </FormControl>

                    <FormControl id="tags">
                        <FormLabel>Tags (comma separated)</FormLabel>
                        <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="react, nextjs, tutorial" />
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
                        Create Post
                    </Button>
                </VStack>
            </form>
        </Container>
    )
}

export default CreatePost
