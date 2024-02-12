"use client"

import React, { useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TagIcon from '../icons/TagIcon';

export default function AdminNav() {
    const pathname = usePathname();

    const [openNav, setOpenNav]:any = useState();

    const activeClass = 'bg-blue-500 text-white';
    const hoverClass = 'hover:bg-blue-500/50';

    const handleNavOpen = () => {
        setOpenNav(!openNav)
    }

    return (
        <>
            <div className='absolute top-2 right-2 md:hidden z-50'>
                <button onClick={handleNavOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
            <nav className={`absolute h-full z-50 md:fixed top-0 pt-4 px-4 min-w-[192px] md:block ${openNav ? 'block' : 'hidden'} bg-gray-200 shadow-md md:shadow-none`}>
                <div className='flex gap-2 items-center mb-6'>
                    <Link href={'/'}>
                        <div className={`flex gap-2 items-center`}>
                                <div className='bg-gray-400 rounded-xl p-2 text-stone-50'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h1 className='text-lg font-bold leading-5'>Bread by Brian</h1>
                        </div>
                    </Link>
                    <button onClick={handleNavOpen} className='block md:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <ul className='space-y-2'>
                    <li>
                        <Link 
                            href={'/admin'} 
                            className={`${pathname == "/admin" ? activeClass : hoverClass} rounded-lg p-2 w-full flex gap-2 transition-colors duration-200`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                            </svg>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href={'/admin/products'} 
                            className={`${pathname == "/admin/products" ? activeClass : hoverClass} rounded-lg p-2 w-full flex gap-2 transition-colors duration-200`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                            </svg>
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href={'/admin/inventory'} 
                            className={`${pathname == "/admin/inventory" ? activeClass : hoverClass} rounded-lg p-2 w-full flex gap-2 transition-colors duration-200`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            Inventory
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href={'/admin/orders'} 
                            className={`${pathname.includes("/admin/orders") ? activeClass : hoverClass} rounded-lg p-2 w-full flex gap-2 transition-colors duration-200`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            Orders
                        </Link>
                        <Link
                            href={'/admin/orders/special-orders'}
                            className={`${pathname.includes('/admin/orders') ? 'block' : 'hidden'} text-sm text-right mr-2 mt-2`}
                        >
                            Special Orders
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href={'/admin/discounts'} 
                            className={`${pathname == "/admin/discounts" ? activeClass : hoverClass} rounded-lg p-2 w-full flex gap-2 transition-colors duration-200`}
                        >
                            <TagIcon />
                            Discounts
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
