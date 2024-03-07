"use client"
import { supabase } from '@/supabase/lib/supabaseClient';
import React from 'react'
import CardIcon from './icons/CardIcon';
import ProfileIcon from './icons/ProfileIcon';
import LogOutIcon from './icons/LogOutIcon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type NavBarProps = {
    name: string;
    email: string;
    id: any;
};

export default function UserNav({ name, email, id }: NavBarProps) {
    const router = useRouter();
    return (
        <nav className='shadow-md shadow-brand-secondary/50 rounded-xl overflow-hidden h-80'>
            <div className='bg-gradient-to-tr from-brand-secondary via-brand-primary to-white h-24 rounded-t-xl' />
            <div className='px-4 py-2'>
                <div className='flex flex-col items-center justify-center mb-12'>
                    <p className='text-lg font-semibold'>{name ? name : ''}</p>
                    <p className='text-gray-400 text-sm'>{email ? email : ''}</p>
                </div>
                <ul className='space-y-2'>
                    <li>
                        <Link href={`/user/${id}`} className='flex gap-2'>
                            <CardIcon />
                            Loyalty Card
                        </Link>
                    </li>
                    <li>
                        <Link href={`/user/${id}/info`} className='flex gap-2'>
                            <ProfileIcon />
                            Personal Info
                        </Link>
                    </li>
                    <li className='flex gap-2 text-gray-400 text-sm hover:text-red-500 transition-colors duration-300'>
                        <LogOutIcon />
                        <button className='' onClick={async () => {await supabase.auth.signOut(); router.push('/')}}>Sign Out</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
