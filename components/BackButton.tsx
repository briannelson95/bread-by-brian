"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

export default function BackButton({ text }: { text?: string; }) {
    const router = useRouter();

    return (
        <button 
            onClick={() => router.back()} 
            className='flex gap-2 items-center hover:underline w-[72px]'
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            {text && text}
        </button>
    )
}
