'use client'

import { useState, useEffect } from 'react'
import { Post } from '@prisma/client'

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        const res = await fetch('/api/posts')
        const data = await res.json()
        setPosts(data)
    }

    const createPost = async () => {
        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        })
        if (res.ok) {
            fetchPosts()
            setTitle('')
            setContent('')
        }
    }

    const updatePost = async (id: number) => {
        const newTitle = prompt('Enter new title')
        const newContent = prompt('Enter new content')
        if (!newTitle || !newContent) return

        const res = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, content: newContent }),
        })
        if (res.ok) fetchPosts()
    }

    const deletePost = async (id: number) => {
        const res = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        })
        if (res.ok) fetchPosts()
    }

    return (
        <div>
            <h1>Posts</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={createPost}>Create Post</button>

            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <button onClick={() => updatePost(post.id)}>
                            Update
                        </button>
                        <button onClick={() => deletePost(post.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
