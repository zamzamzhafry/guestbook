'use client'
import React from 'react'
import AddGuestModal from './AddGuestModal'
import { useState } from 'react'

export default function AddGuestButton() {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenModal = () => {
        setIsOpen(true)
    }

    return (
        <>
            <button
                onClick={handleOpenModal}
                className="px-5 py-2 text-sm font-medium rounded-md"
            />
            <AddGuestModal onAddGuest={() => {}} />
        </>
    )
}
