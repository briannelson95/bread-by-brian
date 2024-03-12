import Link from 'next/link';
import React from 'react'

export default function PublicAlertBanner({ text, visible, link }: { text: string; visible: boolean; link?: string; }) {
    return (
        <div className={`top-0 left-0 w-full bg-yellow-500 py-1 z-50 text-center ${!visible && 'hidden'}`}>
            {link ? (
                <Link href={link}>
                    {text}
                </Link>
            ) : <p>{text}</p>}
        </div>
    )
}
