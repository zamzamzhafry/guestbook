import React from 'react'

const GuestStatusBadge: React.FC<{ status: number }> = ({ status }) => {
    const GuestStatus: { [key: number]: { text: string; color: string } } = {
        0: { text: 'Belum Konfirmasi', color: 'bg-yellow-100 text-yellow-700' },
        1: { text: 'Akan Hadir', color: 'bg-blue-100 text-blue-700' },
        2: { text: 'Telah Hadir', color: 'bg-green-100 text-green-700' },
        3: { text: 'Tidak Hadir', color: 'bg-red-100 text-red-700' },
    }
    const statusInfo = GuestStatus[status] || {
        text: 'Unknown',
        color: 'bg-gray-100 text-gray-700',
    }

    return (
        <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}
        >
            {statusInfo.text}
        </span>
    )
}

export default GuestStatusBadge
