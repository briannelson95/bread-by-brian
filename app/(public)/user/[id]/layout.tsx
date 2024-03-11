"use client"
import UserNav from '@/components/UserNav'
import { UserContext } from '@/context/UserContext';
import { supabase } from '@/supabase/lib/supabaseClient';
import { useSession } from '@supabase/auth-helpers-react';
import { usePathname, redirect } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

export default function UserLayout({ children }: { children: React.ReactNode }) {

    const {profile}: any = useContext(UserContext);

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
