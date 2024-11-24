import {
    Dialog,
    // DialogClose,
    DialogContent,
    DialogDescription,
    // DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Copy } from 'lucide-react'

import React from 'react'
import { RegistrationForm } from './Register/RegistrationForm'

export function AddGuestDialog({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: (open: boolean) => void
}) {
    // const [open, setOpen] = React.useState(false)

    const handleCloseDialog = () => {
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogTrigger asChild>
                <Button variant="outline">Tambah Tamu</Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tambah Tamu</DialogTitle>
                    <DialogDescription>
                        Tambahkan Calon Tamu yang akan Hadir
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <RegistrationForm onSave={handleCloseDialog} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddGuestDialog
