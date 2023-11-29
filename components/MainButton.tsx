"use client"
import React from 'react'

export default function MainButton({ title, onClick, noShadow, disabled }: { title: string; onClick?: any; noShadow?: boolean; disabled?: boolean }) {
    return (
        <div className='fixed z-40 bottom-4 left-1/2 -translate-x-1/2 w-full p-4 md:static md:transform-none'>
            <button 
                className={`w-full bg-yellow-500 disabled:bg-gray-500 text-xl font-bold p-2 flex justify-center items-center rounded-full text-white ${!noShadow && 'shadow-lg'}`}
                onClick={onClick}
                disabled={disabled ? disabled : false}
            >
                {title}
            </button>
        </div>
    )
}
