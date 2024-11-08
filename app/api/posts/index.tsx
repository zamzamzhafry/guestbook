// pages/api/posts/index.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const posts = await prisma.post.findMany()
        res.json(posts)
    } else if (req.method === 'POST') {
        const { title, content } = req.body
        const newPost = await prisma.post.create({
            data: { title, content },
        })
        res.json(newPost)
    } else {
        res.status(405).end()
    }
}
