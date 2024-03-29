"use client"

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { createContext, useContext, useEffect, useState } from 'react'

export const UserContext = createContext({});
export const ProfileContext = createContext({});

export const UserContextProvider = ({ children }: {children: React.ReactNode}) => {
    const session = useSession();
    const supabase = useSupabaseClient();
    const [profile, setProfile]: any = useState(null);
    const [reward, setReward] = useState<boolean>(false);

    useEffect(() => {
        if (!session?.user.id) {
            return
        };

        supabase.from('profiles')
            .select()
            .eq('id', session?.user.id)
            .then(result => {
                if (!result.error) {
                    setProfile(result.data[0]);
                    setReward(result.data[0].reward)
                }
            })
    }, [session?.user.id])

    return (
        <UserContext.Provider value={{profile, reward}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
