'use client'
import React from 'react'
import AddGuestModal from './AddGuestModal'
import AddGuestDialog from './AddGuestDialog'
import { useState } from 'react'

export default function AddGuestButton() {
    const [isOpen, setIsOpen] = useState(false)

    // const handleOpenModal = () => {
    //     setIsOpen(true)
    // }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-5 py-2 text-sm font-medium rounded-md border-spacing-2 border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Tambah Tamu
            </button>
            <AddGuestDialog open={isOpen} setOpen={setIsOpen} />
            {/* <AddGuestModal onAddGuest={() => {}} /> */}
        </>
    )
}
