'use client'
import React, { useState } from 'react'
import EditGuestDialog from './EditGuestDialog'
// import { Button } from '../ui/button'

const EditGuestButton = ({ guest }) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => {
        setIsOpen(true)
    }
    return (
        <div>
            <button onClick={handleClick}>EDIT</button>
            <EditGuestDialog open={isOpen} setOpen={setIsOpen} guest={guest} />
        </div>
    )
}

export default EditGuestButton
