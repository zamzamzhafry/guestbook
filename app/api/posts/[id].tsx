// pages/api/posts/[id].ts
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query

    if (req.method === 'PUT') {
        const { title, content } = req.body
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { title, content },
        })
        res.json(updatedPost)
    } else if (req.method === 'DELETE') {
        await prisma.post.delete({
            where: { id: Number(id) },
        })
        res.status(204).end()
    } else {
        res.status(405).end()
    }
}
