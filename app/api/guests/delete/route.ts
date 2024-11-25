import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')

    if (!id) {
        return NextResponse.json(
            { error: 'Guest ID is required' },
            { status: 400 }
        )
    }

    try {
        const deletedGuest = await prisma.guest.delete({
            where: { id }, // Use UUID string directly
        })

        // Return the deleted guest data as JSON
        return NextResponse.json(deletedGuest, { status: 200 })
    } catch (error) {
        console.error('Error deleting guest:', error)

        // Return a JSON response in case of errors
        return NextResponse.json(
            { error: 'Failed to delete guest' },
            { status: 500 }
        )
    }
}
