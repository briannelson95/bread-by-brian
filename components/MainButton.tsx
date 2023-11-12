"use client"
import React from 'react'

export default function MainButton({ title, todo }: { title: string; todo?: any; }) {
    return (
        <div className='fixed z-40 bottom-4 left-1/2 -translate-x-1/2 w-full p-4'>
            <button className='w-full bg-yellow-500 text-2xl font-bold p-2 flex justify-center items-center rounded-full text-white shadow-lg'>
                {title}
            </button>
        </div>
    )
}
