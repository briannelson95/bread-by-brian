"use client"
import { UserContext } from '@/context/UserContext'
import { supabase } from '@/supabase/lib/supabaseClient';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';

export default function PersonalInfoPage() {
    const {profile}: any = useContext(UserContext);

    const [name, setName] = useState<string>(profile.full_name);
    const [email, setEmail] = useState<string>(profile.email);

    const handleSave = () => {
        supabase.from('profiles')
            .update({
                full_name: name,
                email: email
            })
            .eq('id', profile.id)
            .then(result => {
                if (!result.error) {
                    toast.success('Changes Saved')
                }
            })
    }

    return (
        <div>
            <h2 className='text-lg font-semibold'>Personal Info</h2>
            <section className='space-y-2'>
                <form className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4'>
                    <fieldset className='w-full'>
                        <label htmlFor='name' className='w-full text-sm px-1'>Name</label>
                        <input
                            type='text'
                            value={name}
                            className='border rounded-lg p-2 w-full'
                            onChange={(e: any) => setName(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className='w-full'>
                        <label htmlFor='name' className='w-full text-sm px-1'>Email</label>
                        <input
                            type='text'
                            value={email}
                            className='border rounded-lg p-2 w-full'
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                    </fieldset>
                </form>
                <button
                    className={`${name !== profile.full_name ? 'bg-brand-primary font-bold' : 'bg-gray-500'} text-white rounded-lg px-4 py-2 shadow-md shadow-brand-secondary/30`}
                    onClick={handleSave}
                    disabled={name == profile.full_name}
                >
                    Save Changes
                </button>
            </section>
        </div>
    )
}
