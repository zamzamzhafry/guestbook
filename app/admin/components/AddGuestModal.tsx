'use client'

import { useState } from 'react'
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
import { Label } from '@/components/ui/label'

// Validation Schema
const guestSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    whatsapp: z
        .string()
        .nonempty('Whatsapp number is required')
        .regex(/^[0-9]+$/, 'Whatsapp number must contain only digits')
        .min(10, 'Whatsapp number must be at least 10 digits long')
        .max(15, 'Whatsapp number cannot exceed 15 digits'),
    uniqueCode: z.string().optional(),
    guestCount: z
        .number()
        .min(1, 'Guest count must be at least 1')
        .max(10, 'Guest count cannot exceed 10'),
})

// Error Display Helper
const ErrorMessage = ({ message }: { message?: string }) =>
    message ? <p className="text-sm text-red-600 mt-1">{message}</p> : null

const AddGuestModal = ({ onAddGuest }: { onAddGuest: (data: any) => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [uniqueCode, setUniqueCode] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(guestSchema),
    })

    const onSubmit = async (data: any) => {
        const generatedCode = uniqueCode || handleGenerateCode()
        try {
            try {
                console.log('Submitting data:', data) // Debugging input data

                const response = await fetch('/api/guests/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        whatsapp: data.whatsapp,
                        code: generatedCode ?? '',
                        status: data.status ?? 1,
                        guestCount: data.guestCount ?? 1,
                    }),
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    console.error('API Response Error:', errorData) // Log the response error
                    throw new Error(
                        errorData.message || 'An unknown error occurred.'
                    )
                }

                const result = await response.json()
                console.log('Guest added successfully:', result)

                // Call your onAddGuest function with the new guest data
                onAddGuest(result)

                // Clear form
                reset()
                setUniqueCode(null)
                setIsOpen(false)
            } catch (error: any) {
                console.error(
                    'Error occurred during guest creation:',
                    error.message
                )
            }
        } catch (error: any) {
            console.error(
                'Error occurred during guest creation:',
                error.message
            )
        }
    }

    const handleGenerateCode = () => {
        const newCode = Array.from({ length: 8 }, () =>
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
                Math.floor(Math.random() * 62)
            )
        ).join('')

        setValue('uniqueCode', newCode)
        setUniqueCode(newCode)
        return newCode
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Add Guest</Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px] bg-cyan-600">
                    <DialogHeader>
                        <DialogTitle>Tambahkan Guest</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Name */}
                        <div>
                            <Label htmlFor="name" className="mb-2">
                                Nama Tamu
                            </Label>
                            <Input
                                id="name"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                            <ErrorMessage message={errors.name?.message} />
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email" className="mb-2">
                                Email Tamu
                            </Label>
                            <Input
                                id="email"
                                {...register('email')}
                                error={errors.email?.message}
                            />
                            <ErrorMessage message={errors.email?.message} />
                        </div>

                        {/* Whatsapp */}
                        <div>
                            <Label htmlFor="whatsapp" className="mb-2">
                                Nomor Whatsapp
                            </Label>
                            <Input
                                id="whatsapp"
                                type="tel"
                                {...register('whatsapp')}
                                error={errors.whatsapp?.message}
                            />
                            <ErrorMessage message={errors.whatsapp?.message} />
                        </div>

                        {/* Unique Code */}
                        <div>
                            <Label htmlFor="uniqueCode" className="mb-2">
                                Kode Unik
                            </Label>
                            <div className="flex items-center">
                                <Input
                                    id="uniqueCode"
                                    value={uniqueCode || ''}
                                    disabled
                                    error={errors.uniqueCode?.message}
                                />
                                <Button
                                    type="button"
                                    className="ml-3"
                                    onClick={handleGenerateCode}
                                >
                                    Generate
                                </Button>
                            </div>
                            <ErrorMessage
                                message={errors.uniqueCode?.message}
                            />
                        </div>

                        {/* Guest Count */}
                        <div>
                            <Label htmlFor="guestCount" className="mb-2">
                                Jumlah Tamu
                            </Label>
                            <Input
                                id="guestCount"
                                type="number"
                                defaultValue={1}
                                {...register('guestCount', {
                                    valueAsNumber: true,
                                })}
                                error={errors.guestCount?.message}
                            />
                            <ErrorMessage
                                message={errors.guestCount?.message}
                            />
                        </div>

                        {/* Footer */}
                        <DialogFooter>
                            <Button type="submit" onClick={onSubmit}>
                                Save
                            </Button>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => {
                                    reset()
                                    setIsOpen(false)
                                }}
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
