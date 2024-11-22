import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
    Form,
    FormControl,
    FormDescription,
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

// import { useState } from 'react'

const registerUser = (userInfo: {
    name: string
    email: string
    password: string
}) => {
    const usersFromStore: { name: string; email: string; password: string }[] =
        JSON.parse(window.localStorage.getItem('users') ?? '[]') || []
    const newUser = {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
    }
    usersFromStore.push(newUser)
    window.localStorage.setItem('users', JSON.stringify(usersFromStore))
}

// const passwordValidation = new RegExp(
//     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
// )

const formSchema = z.object({
    name: z.string().min(3, {
        message: 'Name must be at least 3 characters.',
    }),
    email: z
        .string()
        .min(1, {
            message: 'You mus give an email address.',
        })
        .email('This is not a valid email.'),
    whatsapp: z
        .string()
        .min(8, {})
        .refine(
            (value) => {
                const phoneRegex =
                    /^(\+\d{1,2}\s?)?1?\-?\s?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}$/
                return phoneRegex.test(value)
            },
            {
                message: 'This is not a valid phone number.',
            }
        ),
    uniqueCode: z.string().min(1, {
        message: 'You must give a unique code.',
    }),
    status: z.number(),
    guestCount: z.number(),
    // password: z
    //     .string()
    //     .min(1, {
    //         message: 'You must give a password',
    //     })
    //     .regex(passwordValidation, {
    //         message: 'Your password is not valid',
    //     }),
})
export function RegistrationForm({ onSave }) {
    // const [uniqueCode, setUniqueCode] = useState<string | null>(null)

    const handleGenerateCode = () => {
        // const newCode = Array.from({ length: 8 }, () =>
        //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
        //         Math.floor(Math.random() * 62)
        //     )
        // ).join('')
        // setValue('uniqueCode', newCode)
        // setUniqueCode(newCode)
        // return newCode
        return 'Unik123'
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            // password: '',
            whatsapp: '',
            uniqueCode: handleGenerateCode() ?? '',
            status: 1,
            guestCount: 1,
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        registerUser(values)
        onSave()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Specify a Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Give Your Full Name
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Specify an Email"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Give a Valid Email Address
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Specify a Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                A password must be with Minimum 8 characters, at
                                least one uppercase letter, one lowercase
                                letter, one number and one special character.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="uniqueCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kode Tamu</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Cetak Kode Tamu"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Cetak Kode Tamu dengan Klik
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field: { onChange, value } }) => (
                        <FormItem>
                            <FormLabel>Status Kehadiran</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(val) => onChange(val)}
                                    value={value.toString()}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Pilih Kehadiran" />
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
                            <FormDescription>
                                Pilih Status Kehadiran
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
