import { useState } from 'react'
import { nanoid } from 'nanoid'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const AddGuestModal = ({ onAddGuest }: { onAddGuest: (data: any) => void }) => {
    const [isOpen, setIsOpen] = useState(false)

    // Validation Schema
    const guestSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email'),
        phone: z.string().regex(/^\d{10,15}$/, 'Enter a valid phone number'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(guestSchema),
    })

    const onSubmit = (data: any) => {
        const uniqueCode = nanoid(8) // Generate unique code (8 characters)
        onAddGuest({ ...data, uniqueCode })
        reset() // Clear the form
        setIsOpen(false) // Close the modal
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Add Guest</Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Guest</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <Input
                            label="Name"
                            {...register('name')}
                            error={errors.name?.message}
                        />
                        <Input
                            label="Email"
                            {...register('email')}
                            error={errors.email?.message}
                        />
                        <Input
                            label="Phone"
                            {...register('phone')}
                            error={errors.phone?.message}
                        />
                        <DialogFooter>
                            <Button type="submit">Save</Button>
                            <Button
                                variant="secondary"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddGuestModal
