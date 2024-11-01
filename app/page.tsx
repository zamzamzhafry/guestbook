'use client'
// import Image from "next/image";
import QRCode from 'react-qr-code'
import Link from 'next/link'
import { useState } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default function Home() {
    const [inputValue, setInputValue] = useState('')
    // const [inputGenderValue, setInputGenderValue] = useState('')

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000' // Fallback for local development

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputValue(value)
    }

    const [inputGenderValue, setInputGenderValue] = useState('male')

    const handleChangeGender = (value: string) => {
        setInputGenderValue(value)
    }

    return (
        <div className="flex justify-center justify-items-center h-screen">
            <main className="flex flex-col items-center justify-center">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>QR Generator</CardTitle>
                        <CardDescription>
                            Masukkan Nama dan Gender
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Nama Hadirin"
                                        value={inputValue}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">
                                        Pilih Gender
                                    </Label>
                                    <Select
                                        value={inputGenderValue || 'male'}
                                        onValueChange={handleChangeGender}
                                        // onChange={handleChangeGender}
                                    >
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Pilih Gender" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="male">
                                                Bapak/Sdr.
                                            </SelectItem>
                                            <SelectItem value="female">
                                                Ibu/Sdri.
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="pb-6 pl-4 justify-center">
                                    <Link
                                        href={
                                            inputValue
                                                ? `${baseUrl}/welcome?value=${encodeURIComponent(
                                                      inputValue
                                                  )}&gender=${encodeURIComponent(
                                                      inputGenderValue
                                                  )}`
                                                : ''
                                        }
                                    >
                                        <QRCode
                                            value={
                                                inputValue
                                                    ? `${baseUrl}/welcome?value=${encodeURIComponent(
                                                          inputValue
                                                      )}&gender=${encodeURIComponent(
                                                          inputGenderValue
                                                      )}`
                                                    : ''
                                            }
                                        />
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}
