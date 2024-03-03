"use client"
import MainButton from '@/components/MainButton';
import PunchCard from '@/components/PunchCard';
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

    const handlePunch = () => {
        supabase.from('profiles')
            .select('punch')
            .eq('id', userProfile.id)
            .then(result => {
                if (!result.error) {
                    setPunches(result.data[0].punch)

                    supabase.from('profiles')
                        .update({
                            punch: result.data[0].punch + 1
                        })
                        .eq('id', userProfile.id)
                        .select()
                        .then(result => {
                            console.log(result)
                        })
                }
            })
    };

    return (
        <div className='w-full p-2 relative mb-16 md:max-w-4xl mx-auto space-y-6'>
            <div className="flex justify-between">
                <h1 className='text-3xl font-bold'>Welcome, {userProfile?.full_name}</h1>
                <button className='text-gray-400 text-sm' onClick={async () => {await supabase.auth.signOut(); router.push('/')}}>Sign Out</button>
            </div>
            <div className=''>
                <PunchCard
                    name={userProfile?.full_name}
                    punches={punches}
                />
            </div>
        </div>
    )
}