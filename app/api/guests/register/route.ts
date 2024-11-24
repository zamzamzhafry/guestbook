import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        // Parse the incoming JSON payload
        const body = await req.json()
        const { name, email, whatsapp, uniqueCode, status, guestCount } = body

        // Create the new guest record in the database
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

        // Respond with the newly created guest
        return NextResponse.json(newGuest, { status: 200 })
    } catch (error: any) {
        console.error('Error creating guest:', error.message)
        return NextResponse.json(
            { message: error.message || 'Internal Server Error' },
            { status: 500 }
        )
    }
}
