import AdminNav from '@/components/admin/AdminNav'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='min-h-screen flex'>
            <AdminNav />
            {children}
        </main>
    )
}
