// 'use client'

import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import AddGuestButton from './components/AddGuestButton'

const GuestStatus = {
    0: { text: 'Unconfirmed', color: 'bg-yellow-100 text-yellow-700' },
    1: { text: 'Will Attend', color: 'bg-blue-100 text-blue-700' },
    2: { text: 'Has Attended', color: 'bg-green-100 text-green-700' },
    3: { text: 'Not Attending', color: 'bg-red-100 text-red-700' },
}

export default async function AdminPage() {
    const guests = await prisma.guest.findMany({
        where: {
            isDeleted: false, // Adjust based on your schema
        },
    })

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-700">
                        Guest List
                    </h1>
                    <div className="flex items-center space-x-2">
                        <AddGuestButton />

                        <Button
                            variant="secondary"
                            className="px-5 py-2 text-sm font-medium rounded-md"
                        >
                            Import Guest
                        </Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    {/* Table */}
                    <Table className="w-full">
                        <TableCaption className="text-gray-600 italic">
                            List of all registered guests
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-center">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {guests.length > 0 ? (
                                guests.map((guest) => (
                                    <TableRow key={guest.id}>
                                        <TableCell>{guest.name}</TableCell>
                                        <TableCell>{guest.email}</TableCell>
                                        <TableCell>
                                            <GuestStatusBadge
                                                status={guest.status}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                className="mr-2"
                                                variant="default"
                                                size="sm"
                                            >
                                                Detail
                                            </Button>
                                            <Button
                                                className="mr-2"
                                                variant="default"
                                                size="sm"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-gray-500"
                                    >
                                        No guests found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

function GuestStatusBadge({ status }: { status: number }) {
    const statusInfo = GuestStatus[status] || {
        text: 'Unknown',
        color: 'bg-gray-100 text-gray-700',
    }

    return (
        <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}
        >
            {statusInfo.text}
        </span>
    )
}
