"use client"
import AdminNav from '@/components/admin/AdminNav'
import { UserContext, UserContextProvider } from '@/context/UserContext'
import { redirect } from 'next/navigation'
import React, { useContext } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const {profile}: any = useContext(UserContext)
    if (!profile?.admin) {
        redirect('/')
    }
    return (
        <main className='flex min-h-screen md:pb-10 bg-gray-100'>
            <AdminNav />
            <div className='md:ml-52 w-full relative'>
                {children}
            </div>
        </main>
    )
}
