'use client'

import { Guest } from '@prisma/client'
// import prisma from '@/lib/prisma'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export interface DeleteGuestDialogProps {
    onDelete: (guest: Guest) => void
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    guest: Guest
}

export function DeleteGuestDialog({
    onDelete,
    isOpen,
    setIsOpen,
    guest,
}: DeleteGuestDialogProps) {
    const handleDelete = async () => {
        console.log('Deleting guest with ID:', guest.id)
        try {
            const response = await fetch(`/api/guests/delete?id=${guest.id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to delete guest')
            }

            console.log('Guest deleted successfully')
        } catch (error) {
            console.error('Error during delete:', error.message)
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" className="text-sm font-medium">
                    Hapus
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Hapus Tamu</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus tamu{' '}
                        <strong>{guest.name}</strong>?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Button onClick={handleDelete} variant="destructive">
                        Ya, Hapus
                    </Button>
                    <DialogClose asChild>
                        <Button variant="secondary">Batal</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteGuestDialog
