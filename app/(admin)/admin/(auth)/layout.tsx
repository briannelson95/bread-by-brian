import AdminNav from '@/components/admin/AdminNav'
import { UserContextProvider } from '@/context/UserContext'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserContextProvider>
            <main className='min-h-screen flex'>
                <AdminNav />
                {children}
            </main>
        </UserContextProvider>
    )
}
