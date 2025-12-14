import { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Container,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useToast,
    Link,
    Flex,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { BlogPost } from 'lib/blogService'

const AdminDashboard = () => {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const toast = useToast()
    const router = useRouter()

    const fetchPosts = async () => {
        const res = await fetch('/api/posts')
        const data = await res.json()
        setPosts(data)
    }

    useEffect(() => {
        const token = localStorage.getItem('admin_token')
        if (!token) {
            router.push('/admin/login')
        } else {
            fetchPosts()
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('admin_token')
        router.push('/admin/login')
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return

        const token = localStorage.getItem('admin_token')
        const res = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (res.ok) {
            toast({
                title: 'Post deleted.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            fetchPosts()
        } else {
            toast({
                title: 'Failed to delete post.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <Container maxW="container.xl" py={10} mt={20}>
            <Flex justifyContent="space-between" alignItems="center" mb={8}>
                <Heading>Blog Administration</Heading>
                <Box>
                    <NextLink href="/admin/settings">
                        <Button variant="outline" mr={4}>
                            Settings
                        </Button>
                    </NextLink>
                    <Button colorScheme="red" variant="ghost" onClick={handleLogout} mr={4}>
                        Logout
                    </Button>
                    <NextLink href="/admin/create">
                        <Button leftIcon={<AddIcon />} colorScheme="teal">
                            Create New Post
                        </Button>
                    </NextLink>
                </Box>
            </Flex>
            <Box overflowX="auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Title</Th>
                            <Th>Slug</Th>
                            <Th>Published At</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {posts.map((post) => (
                            <Tr key={post.id}>
                                <Td>{post.id}</Td>
                                <Td fontWeight="bold">{post.title}</Td>
                                <Td>{post.slug}</Td>
                                <Td>{new Date(post.published_at).toLocaleDateString('en-GB')}</Td>
                                <Td>
                                    <NextLink href={`/admin/edit/${post.id}`}>
                                        <IconButton
                                            aria-label="Edit"
                                            icon={<EditIcon />}
                                            mr={2}
                                            size="sm"
                                        />
                                    </NextLink>
                                    <IconButton
                                        aria-label="Delete"
                                        icon={<DeleteIcon />}
                                        colorScheme="red"
                                        size="sm"
                                        onClick={() => handleDelete(post.id)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Container>
    );
}

export default AdminDashboard
