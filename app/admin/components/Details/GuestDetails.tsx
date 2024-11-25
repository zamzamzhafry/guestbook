import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    // DialogFooter,
    DialogClose,
} from '@/components/ui/dialog'

interface Guest {
    name: string
    email: string
    whatsapp: string
    guestCount: number
}
const GuestDetails = ({
    guest: Guest,
    // onShowDetails
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button
                        type="button"
                        className="text-sm font-medium"
                        // onClick={onShowDetails}
                    >
                        Details
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Detail Tamu</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <p>Address: {Guest.name}</p>

                    <p>Email: {Guest.email}</p>
                    <p>Whatsapp: {Guest.whatsapp}</p>
                    <p>Guest Count: {Guest.guestCount}</p>
                </div>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default GuestDetails

