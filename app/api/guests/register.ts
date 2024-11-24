// import { NextApiRequest, NextApiResponse } from 'next'
// import prisma from '@/lib/prisma' // Ensure this points to your Prisma client setup

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method !== 'POST') {
//         return res
//             .status(405)
//             .json({ error: `Method ${req.method} not allowed` })
//     }

//     const { name, email, whatsapp, uniqueCode, guestCount, status } = req.body

//     if (!name || !email || !whatsapp) {
//         return res
//             .status(400)
//             .json({ error: 'Name, email, and WhatsApp are required' })
//     }

//     try {
//         const newGuest = await prisma.guest.create({
//             data: {
//                 name,
//                 email,
//                 whatsapp,
//                 code: uniqueCode ?? 'noCode1', // Default code if not provided
//                 guestCount: guestCount ?? 1, // Default guest count to 1
//                 status: status ?? 1, // Default status to 1
//             },
//         })

//         return res
//             .status(201)
//             .json({ message: 'Guest registered successfully', guest: newGuest })
//     } catch (error) {
//         console.error('Error registering user:', error)
//         return res.status(500).json({ error: 'Failed to register guest' })
//     }
// }

// // pages/api/guests/register.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        try {
            const { name, email, whatsapp, uniqueCode, status, guestCount } =
                req.body

            const newGuest = await prisma.guest.create({
                data: {
                    name,
                    email,
                    whatsapp,
                    code: uniqueCode,
                    status,
                    guestCount,
                },
            })

            return res.status(200).json(newGuest)
        } catch (error) {
            console.error('Error registering guest:', error)
            return res
                .status(500)
                .json({ message: 'Error during registration' })
        }
    } else {
        // Handle non-POST requests
        return res.status(405).json({ message: 'Method not allowed' })
    }
}
