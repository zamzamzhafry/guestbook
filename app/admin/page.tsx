import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    // TableContainer,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

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
                        <Button
                            variant="default"
                            className="px-5 py-2 text-sm font-medium rounded-md"
                        >
                            Add Guest
                        </Button>
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
                    {/* <TableContainer> */}
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
                                            <span
                                                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                                                    guest.status === 'active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                            >
                                                {guest.status}
                                            </span>
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
                    {/* </TableContainer> */}
                </div>
            </div>
        </div>
    )
}
