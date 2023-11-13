"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function Navbar() {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <nav>
            <ul className='flex items-center justify-between md:p-2'>
                <li className='md:hidden'>
                    {pathname !== '/' ? (
                        <button onClick={() => router.back()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
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
                <li className=''>
                    <Link href={'/cart'} className='flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <span>My Cart</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
