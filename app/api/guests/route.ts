import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
    const data = await request.json()

    try {
        const newGuest = await prisma.guest.create({
            data: {
                name: data.name,
                email: data.email,
                whatsapp: data.whatsapp,
                code: data.code ?? '',
                status: data.status ?? 1, // Default status
                guestCount: data.guestCount ?? 1,
            },
        })

        return NextResponse.json(newGuest, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to add guest' },
            { status: 500 }
        )
    }
}
