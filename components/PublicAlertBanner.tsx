import React from 'react'

export default function PublicAlertBanner({ text, visible }: { text: string; visible: boolean }) {
    return (
        <div className={`top-0 left-0 w-full bg-yellow-500 py-1 z-50 text-center ${!visible && 'hidden'}`}>{text}</div>
    )
}
