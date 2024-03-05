"use client"
import UserNav from '@/components/UserNav'
import { UserContext } from '@/context/UserContext';
import { supabase } from '@/supabase/lib/supabaseClient';
import { useSession } from '@supabase/auth-helpers-react';
import { usePathname, redirect, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const id = pathname.slice(6);
    const session = useSession();

    const {profile}: any = useContext(UserContext);

    const [punches, setPunches] = useState<number>(0);

    useEffect(() => {
        if(session?.user.id !== id) {
            redirect('/')
        }

        supabase.from('profiles')
            .select()
            .eq('id', profile.id)
            .then(result => {
                if (result.data?.length) {
                    setPunches(result.data[0].punch)
                }
            })
    }, [])

    const isMyUser = profile?.id === session?.user.id;

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
                    name={profile?.full_name} 
                    email={profile?.email}
                    id={profile?.id}
                />
                <div className='col-span-2'>
                    {children}
                </div>
            </div>
        </div>
    )
}
