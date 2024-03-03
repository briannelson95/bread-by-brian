"use client"
import AuthForm from '@/components/auth/AuthForm'
import { useSession } from '@supabase/auth-helpers-react';
import { redirect, useRouter } from 'next/navigation';
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useUser } from '@/context/UserContext';

export default function LoginPage() {
    const session = useSession();
    const router = useRouter();
    const { profile }: any = useUser();
    
    useEffect(() => {
        // if (profile.admin) {
        //     redirect('/admin')  
        // } 
        // redirect('/')
    }, [session, router]);

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
