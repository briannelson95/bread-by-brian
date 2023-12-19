import AdminNav from '@/components/admin/AdminNav'
import { UserContextProvider } from '@/context/UserContext'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserContextProvider>
            <main className='flex min-h-screen md:pb-20 bg-gray-100'>
                <AdminNav />
                <div className='md:ml-52 w-full'>
                    {children}
                </div>
            </main>
        </UserContextProvider>
    )
}
