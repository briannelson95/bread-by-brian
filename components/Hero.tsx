import React from 'react'

export default function Hero() {
    return (
        <div className='w-full rounded-2xl border p-6 h-96'>
            <div className='relative'>
                <h1 className='text-9xl font-serif font-bold text-center z-20'>Bread</h1>
                <p className='font-serif text-2xl font-thin absolute top-2 right-64'>as it should be</p>
                <div className='absolute top-10 right-52 -z-10 rounded-xl w-1/2 h-20 bg-brand-primary' />
            </div>
        </div>
    )
}
