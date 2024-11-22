import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
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

export function AddGuestDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Tambah Tamu</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tambah Tamu</DialogTitle>
                    <DialogDescription>
                        Tambahkan Calon Tamu yang akan Hadir
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <RegistrationForm onSave={() => {}} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddGuestDialog
