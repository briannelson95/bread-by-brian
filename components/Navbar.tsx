"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import BackButton from './BackButton'
import { CartContext } from '@/context/AppContext'
import ProfileIcon from './icons/ProfileIcon'
import { useUser } from '@/context/UserContext'
import ProfileIconFilled from './icons/ProfileIconFilled'

export default function Navbar() {
    const router = useRouter()
    const pathname = usePathname();
    const { profile }: any = useUser();

    const {cartProducts}: any = useContext(CartContext)

    return (
        <>
            {profile?.admin && (
                <div className='w-full bg-brand-secondary text-white text-right'>
                    <div className='max-w-4xl p-1 mx-auto md:px-0'>
                        <Link href={'/admin'}>
                            Edit Site
                        </Link>
                    </div>
                </div>
            )}
            
            <nav className='max-w-4xl p-2 mx-auto md:px-0'>
                <ul className='flex items-center justify-between md:py-2'>
                    <li className='md:hidden'>
                        {pathname !== '/' ? (
                            <BackButton />
                        ) : <div className='w-6' />}
                        
                    </li>
                    <li>
                        <Link href={'/'}>
                            <Image
                                src={'/bread-logo.png'}
                                height={1000}
                                width={1000}
                                alt='logo'
                                className='h-16 w-16'
                            />
                        </Link>
                    </li>
                    <div className='flex gap-6'>
                        {/* <li>
                            <Link href={profile ? `/user/${profile.id}` : '/login' } className='flex gap-2'>
                                <div>
                                    {profile ? (
                                        <ProfileIconFilled />
                                    ) : (
                                        <ProfileIcon />
                                    )}
                                
                                </div>
                                <span className='hidden md:block'>{profile ? profile.full_name : 'Login'}</span>
                            </Link>
                        </li> */}
                        <li className='relative'>
                            <Link href={'/cart'} className='flex gap-2'>
                                <div className='relative'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    {cartProducts.length ? (
                                        <div className={`${cartProducts.length ? 'block' : 'hidden'} h-3 w-3 rounded-full bg-red-500 text-white text-sm absolute -top-1 -right-1 flex justify-center items-center`}>
                                            {/* {cartProducts.length} */}
                                        </div>
                                    ) : ''}
                                </div>
                                <span className='hidden md:block'>My Cart</span>
                            </Link>
                        </li>
                    </div>
                </ul>
            </nav>
        </>
    )
}
