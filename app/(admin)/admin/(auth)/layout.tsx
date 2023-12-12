import AdminNav from '@/components/admin/AdminNav'
import { UserContextProvider } from '@/context/UserContext'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserContextProvider>
            <main className='h-screen flex md:mb-20'>
                <AdminNav />
                <div className='md:ml-52 w-full'>
                    {children}
                </div>
            </main>
        </UserContextProvider>
    )
}
