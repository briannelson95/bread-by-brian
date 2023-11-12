import React from 'react'
import Options from './Options'

export default function ProductInfo() {
    return (
        <div className='w-full p-2 space-y-2'>
            <div className='bg-zinc-500 rounded-full aspect-square w-full h-auto' />
            <div>
                <Options />
                <h1 className='text-3xl font-bold'>Sourdough bread</h1>
            </div>
        </div>
    )
}
