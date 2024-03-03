"use client"
import { supabase } from '@/supabase/lib/supabaseClient';
import { useSession } from '@supabase/auth-helpers-react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default  function ProfilePage() {
    const pathname = usePathname();
    const id = pathname.slice(6);
    const session = useSession();
    const router = useRouter();

    const [userProfile, setUserProfile]: any = useState();

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
    }

    return (
        <div className='w-full p-2 relative mb-16 md:max-w-4xl mx-auto'>
            <div className="flex justify-between">
                <h1 className='text-3xl font-bold'>Welcome, {userProfile?.full_name}!</h1>
                <button onClick={async () => {await supabase.auth.signOut(); router.push('/')}}>Sign Out</button>
            </div>
           
        </div>
    )
}