import AuthForm from '@/components/auth/AuthForm'
import Image from 'next/image'
import React from 'react'

export default function LoginPage() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col items-center shadow-md p-4 rounded-lg bg-gray-50 md:w-1/3'>
                <Image
                    src={'/bread-logo.png'}
                    height={2000}
                    width={2000}
                    alt='logo'
                    className='h-32 w-32'
                />
                <h1 className='text-2xl font-medium text-center'>Welcome to<br /> Bread by Brian</h1>
                <AuthForm />
            </div>
        </div>
    )
}
