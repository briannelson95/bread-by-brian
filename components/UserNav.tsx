"use client"
import { supabase } from '@/supabase/lib/supabaseClient';
import React from 'react'
import CardIcon from './icons/CardIcon';
import ProfileIcon from './icons/ProfileIcon';
import LogOutIcon from './icons/LogOutIcon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ListIcon from './icons/ListIcon';

type NavBarProps = {
    name: string;
    email: string;
    id: any;
};

export default function UserNav({ name, email, id }: NavBarProps) {
    const router = useRouter();
    return (
        <nav className='md:shadow-md md:shadow-brand-secondary/50 rounded-xl overflow-hidden md:h-96'>
            <div className='hidden md:block bg-gradient-to-tr from-brand-secondary via-brand-primary to-white h-24 rounded-t-xl' />
            <div className='md:px-4 py-2'>
                <div className='flex flex-col items-center justify-center md:mb-12'>
                    {name ? (
                        <p className='text-lg font-semibold'>{name ? name : ''}</p>
                    ) : (
                        <div className='bg-gray-500 w-full rounded-lg' />
                    )}
                    <p className='text-gray-400 text-sm'>{email ? email : ''}</p>
                </div>
                <ul className='space-y-2 flex gap-1 md:gap-2 justify-between items-center text-sm md:text-inherit md:block'>
                    <li>
                        <Link href={`/user/${id}`} className='flex gap-1 md:gap-2 items-start'>
                            <CardIcon />
                            <p className='hidden md:block'>Loyalty Card</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/user/${id}/info`} className='flex gap-1 md:gap-2 items-start'>
                            <ProfileIcon />
                            <p className='hidden md:block'>My Info</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/user/${id}/orders`} className='flex gap-1 md:gap-2 items-start'>
                            <ListIcon />
                            <p className='hidden md:block'>Orders</p>
                        </Link>
                    </li>
                    <li className='text-gray-400 text-sm hover:text-red-500 transition-colors duration-300'>
                        <button className='flex gap-2' onClick={async () => {await supabase.auth.signOut(); router.push('/')}}>
                            <LogOutIcon />
                            <p className='hidden md:block'>Sign Out</p>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
