import React from 'react'

export default function PageCard({ children, title }: { children: React.ReactNode; title: string; }) {
    return (
        <section className='mx-2 bg-white rounded-xl p-4 space-y-2'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            {children}
        </section>
    )
}
