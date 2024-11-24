import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog'

const GuestDetails = ({
    guest,
    // onShowDetails
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    className="text-sm font-medium"
                    // onClick={onShowDetails}
                >
                    Details
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <h1 className="text-lg font-bold">{guest.name}</h1>
                </DialogHeader>
                <div className="mt-4">
                    <p>Email: {guest.email}</p>
                    <p>Whatsapp: {guest.whatsapp}</p>
                    <p>Guest Count: {guest.guestCount}</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GuestDetails
