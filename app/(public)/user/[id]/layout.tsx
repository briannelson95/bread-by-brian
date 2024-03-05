"use client"
import UserNav from '@/components/UserNav'
import { supabase } from '@/supabase/lib/supabaseClient';
import { useSession } from '@supabase/auth-helpers-react';
import { usePathname, redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const id = pathname.slice(6);
    const session = useSession();
    const router = useRouter();

    const [userProfile, setUserProfile]: any = useState();
    const [punches, setPunches] = useState<number>(0);

    useEffect(() => {
        if(session?.user.id !== id) {
            redirect('/')
        }

        supabase.from('profiles')
            .select()
            .eq('id', id)
            .then(result => {
                if (result.data?.length) {
                    setUserProfile(result.data[0]);
                    setPunches(result.data[0].punch)
                }
            })
    }, [])

    const isMyUser = userProfile?.id === session?.user.id;

    if (!isMyUser) {
        return (
            <div>
                Loading...
            </div>
        )
    };

    return (
        <div className='w-full p-2 relative mb-16 md:max-w-4xl mx-auto space-y-6'>
            <h1 className='text-2xl font-semibold'>Account</h1>
            <div className='grid grid-cols-3 gap-4'>
                <UserNav 
                    name={userProfile?.full_name} 
                    email={userProfile?.email}
                    id={userProfile?.id}
                />
                <div className='col-span-2'>
                    {children}
                </div>
            </div>
        </div>
    )
}
