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
import GuestStatusBadge from './components/Details/GuestStatusBadge'
import GuestDetails from './components/Details/GuestDetails'
import { DeleteGuestDialog } from './components/Delete/DeleteGuestDialog'
import EditGuestButton from './components/EditGuestButton'

// import { AddGuestDialog } from './components/AddGuestDialog'

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
                        {/* <AddGuestDialog /> */}

                        <Button
                            variant="secondary"
                            className="px-5 py-2 text-sm font-medium rounded-md"
                        >
                            Import Guest (Excels)
                        </Button>

                        <Button
                            variant="destructive"
                            className="px-5 py-2 text-sm font-medium rounded-md"
                        >
                            Format Udangan
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
                                            <div className="flex space-x-2 mt-2">
                                                <GuestDetails
                                                    // onShowDetails={}
                                                    guest={guest}
                                                />
                                            </div>
                                            <div className="flex space-x-2 mt-2">
                                                <EditGuestButton />
                                                {/* <Button
                                                    className="mr-2"
                                                    variant="default"
                                                    size="sm"
                                                    onClick={() =>
                                                        console.log(guest)
                                                    }
                                                >
                                                    Edit
                                                </Button> */}
                                                <DeleteGuestDialog
                                                    guest={guest}
                                                />
                                            </div>
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
