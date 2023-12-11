import AdminNav from '@/components/admin/AdminNav'
import { UserContextProvider } from '@/context/UserContext'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserContextProvider>
            <main className='h-screen flex mb-20'>
                <AdminNav />
                <div className='ml-52'>
                    {children}
                </div>
            </main>
        </UserContextProvider>
    )
}
