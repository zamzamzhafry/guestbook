import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
// import router from 'next/router'

// import { PrismaClient, Prisma } from '@prisma/client'
// const prisma = new PrismaClient()

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
// import { Select } from '@radix-ui/react-select'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
// import { Router } from 'next/router'

// In your component file (e.g., RegistrationForm.tsx)
const registerUser = async (values: z.infer<typeof formSchema>) => {
    try {
        const response = await fetch('/api/guests/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

        if (response.ok) {
            const result = await response.json()
            console.log('Guest registered:', result)
        } else {
            console.error('Error registering guest')
        }
    } catch (error) {
        console.error('Error during submission:', error)
    }
}

// zod schema
const formSchema = z.object({
    name: z.string().min(3, {
        message: 'Name must be at least 3 characters.',
    }),
    email: z
        .string()
        .min(1, {
            message: 'You must give an email address.',
        })
        .email('This is not a valid email.'),
    whatsapp: z
        .string()
        .regex(/^[0-9]+$/, 'Whatsapp number must contain only digits')
        .min(10, 'Whatsapp number must be at least 10 digits long')
        .max(15, 'Whatsapp number cannot exceed 15 digits'),
    //
    uniqueCode: z.string().min(1, {
        message: 'You must give a unique code.',
    }),
    status: z.number(),
    guestCount: z.number().max(10, {
        message: 'Guest count must be less than 10',
    }),
    // password: z
    //     .string()
    //     .min(1, {
    //         message: 'You must give a password',
    //     })
    //     .regex(passwordValidation, {
    //         message: 'Your password is not valid',
    //     }),
})
export function RegistrationForm({ onSave }: { onSave: () => void }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            whatsapp: '',
            uniqueCode: generateUniqueCode(),
            status: 1,
            guestCount: 1,
        },
    })

    // Generates a unique code
    function generateUniqueCode() {
        return Array.from({ length: 8 }, () =>
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
                Math.floor(Math.random() * 62)
            )
        ).join('')
    }

    // Handles the form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log('Form values:', values) // Debugging output
            await registerUser(values) // Ensure the user is registered before refreshing
            onSave() // Refresh or update the admin page after successful registration
            console.log('Guest successfully registered')
            // Router.refresh()
        } catch (error) {
            console.error('Error registering user:', error) // Log the error
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Name Field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* WhatsApp Field */}
                <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>WhatsApp Number</FormLabel>
                            <FormControl>
                                <Input placeholder="081234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Unique Code Field */}
                <FormField
                    control={form.control}
                    name="uniqueCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Guest Code</FormLabel>
                            <FormControl>
                                <Input {...field} disabled readOnly />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Status Field */}
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field: { onChange, value } }) => (
                        <FormItem>
                            <FormLabel>Attendance Status</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(val) =>
                                        onChange(parseInt(val, 10))
                                    }
                                    value={value.toString()}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="0">
                                                Unconfirmed
                                            </SelectItem>
                                            <SelectItem value="1">
                                                Will Attend
                                            </SelectItem>
                                            <SelectItem value="2">
                                                Has Attended
                                            </SelectItem>
                                            <SelectItem value="3">
                                                Not Attending
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="guestCount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Number of Guests</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter the number of guests"
                                    value={field.value?.toString() || ''} // Ensure the value is a string for the Input component
                                    onChange={
                                        (e) =>
                                            field.onChange(
                                                e.target.value
                                                    ? parseInt(
                                                          e.target.value,
                                                          10
                                                      )
                                                    : 0
                                            ) // Convert input to a number
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
