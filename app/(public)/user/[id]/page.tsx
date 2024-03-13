"use client"
import MainButton from '@/components/MainButton';
import PunchCard from '@/components/PunchCard';
import UserNav from '@/components/UserNav';
import { supabase } from '@/supabase/lib/supabaseClient';
import { useSession } from '@supabase/auth-helpers-react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default  function ProfilePage() {
    const pathname = usePathname();
    const id = pathname.slice(6);
    const session = useSession();

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
        <div className='space-y-6'>            
            {/* <h1 className='text-2xl font-bold'>My Loyalty Card</h1> */}
            <PunchCard
                name={userProfile?.full_name}
                punches={punches}
            />
        </div>
    )
}