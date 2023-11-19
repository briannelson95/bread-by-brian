"use client"

import { supabase } from '@/supabase/lib/supabaseClient';
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { redirect } from 'next/navigation';
import React from 'react'

export default function Session({ children }: { children: React.ReactNode}) {

    return (
        <SessionContextProvider
            supabaseClient={supabase}
            initialSession={null}
        >
            {children}
        </SessionContextProvider>
    )
}
