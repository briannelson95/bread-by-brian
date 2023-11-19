'use client'
import { supabase } from '@/supabase/lib/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'

const customTheme = {
    default: {
        colors: {
            brand: 'rgb(59, 130, 246)',
            brandAccent: 'rgb(147, 197, 253)',
            brandButtonText: 'white',
        }
    }
}

export default function AuthForm() {

    return (
        <Auth
            supabaseClient={supabase}
            theme="default"
            providers={['google']}
            onlyThirdPartyProviders={true}
            appearance={{ 
                theme: customTheme,
                style: {
                    input: {
                        borderRadius: '0.375rem',
                        padding: '0.5rem'
                    },
                    button: {
                        padding: '0.5rem',
                        margin: '0.25rem',
                        border: '2px solid rgb(59 130 246)',
                        borderRadius: '0.5rem',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    }
                }
            }}
        />
    )
}