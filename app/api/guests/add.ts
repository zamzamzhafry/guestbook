import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma' // Ensure Prisma client is properly configured

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { name, email, whatsapp, code, status, guestCount } = req.body

            const newGuest = await prisma.guest.create({
                data: { name, email, whatsapp, code, status, guestCount },
            })

            res.status(200).json(newGuest)
        } catch (error) {
            console.error('Failed to create guest:', error)
            res.status(500).json({ message: 'Failed to create guest', error })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
