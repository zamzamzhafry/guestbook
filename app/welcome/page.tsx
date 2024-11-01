// app/welcome/page.tsx
'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'

const WelcomeContent = () => {
    const searchParams = useSearchParams()
    const value = searchParams.get('value') || 'Tidak ada nama'
    const genderParam = searchParams.get('gender')
    const genderValue =
        genderParam === 'female'
            ? 'nyonya'
            : genderParam === 'male'
            ? 'tuan'
            : 'Tidak ada Gender'

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-2xl font-bold mb-4 text-white">Welcome Page</h1>
            <p className="text-lg text-white">
                {genderValue} : <span className="font-mono">{value}</span>
            </p>
        </div>
    )
}

export default function WelcomePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex justify-center">
                <Button
                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => window.history.back()}
                >
                    Back Home
                </Button>
            </div>
            <WelcomeContent />
        </Suspense>
    )
}
