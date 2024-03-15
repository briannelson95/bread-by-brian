"use client"
import { supabase } from '@/supabase/lib/supabaseClient';
import React, { useState } from 'react'
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
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut(); 
        router.push('/');
    }

    return (
        <>
            {open && (
                <div className='absolute w-screen h-screen bg-black/40 z-50 -my-28 -mx-4 md:-my-24 md:-mx-[11.5rem] flex justify-center items-center'>
                    <div className='bg-white w-3/4 md:w-1/2 mx-auto rounded-xl p-4 space-y-4'>
                        <p className='text-center'>Are you sure you want to sign out?</p>
                        <div className='w-full flex justify-around items-center'>
                            <button onClick={handleOpen}>Cancel</button>
                            <button onClick={handleSignOut} className='bg-red-500 rounded-lg text-white font-medium px-4 py-2'>Sign Out</button>
                        </div>
                    </div>
                </div>
            )}
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
                    <ul className='pt-2 md:p-0 md:space-y-2 flex gap-1 md:gap-2 justify-between items-center text-sm md:text-inherit md:block'>
                        <li>
                            <Link href={`/user/${id}`} className='flex flex-col md:flex-row items-center gap-1 md:gap-2 mditems-start'>
                                <CardIcon />
                                <p className=''>Loyalty Card</p>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/user/${id}/info`} className='flex flex-col md:flex-row items-center gap-1 md:gap-2 mditems-start'>
                                <ProfileIcon />
                                <p className=''>My Info</p>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/user/${id}/orders`} className='flex flex-col md:flex-row items-center gap-1 md:gap-2 mditems-start'>
                                <ListIcon />
                                <p className=''>Orders</p>
                            </Link>
                        </li>
                        <li className='text-gray-400 text-sm hover:text-red-500 transition-colors duration-300'>
                            <button className='flex flex-col md:flex-row items-center gap-1' onClick={handleOpen}>
                                <LogOutIcon />
                                <p className=''>Sign Out</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
