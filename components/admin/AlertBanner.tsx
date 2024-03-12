"use client"
import { supabase } from '@/supabase/lib/supabaseClient';
import React, { useEffect, useState } from 'react'

export default function AlertBanner() {
    const [alert, setAlert] = useState('');
    const [link, setLink] = useState<string | null>(null);

    useEffect(() => {
        supabase.from('alert_banner')
            .select('alert')
            .eq('id', 1)
            .then(result => {
                if (!result.error) {
                    setAlert(result.data[0].alert)
                }
            })
    }, [])

    const updateAlert = (e: any) => {
        e.preventDefault();

        supabase.from('alert_banner')
            .update({
                alert,
                link
            })
            .eq('id', 1)
            .then(result => {
                console.log(result)
            })
    }

    return (
        <div className='bg-gray-200 p-4 rounded-xl'>
            <h2 className='text-2xl font-semibold'>Alert Banner</h2>
            <form className='flex gap-2 w-full'>
                <div className='relative w-full'>
                    <fieldset className='relative'>
                        <input
                            type='text'
                            placeholder=' '
                            id='alert'
                            className="rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm border appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            onChange={(e: any) => setAlert(e.target.value)}
                            required
                            value={alert}
                        />
                        <label 
                            htmlFor="alert" 
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                            Alert
                        </label>
                    </fieldset>
                    <fieldset className='relative'>
                        <input
                            type='text'
                            placeholder=' '
                            id='link'
                            className="rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm border appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            onChange={(e: any) => setLink(e.target.value)}
                            required
                            value={link ? link : ''}
                        />
                        <label 
                            htmlFor="link" 
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                            Link
                        </label>
                    </fieldset>
                </div>
                <button 
                    className='bg-blue-500 text-white font-medium px-4 rounded-xl w-32'
                    onClick={updateAlert}
                >
                    Save
                </button>
            </form>
        </div>
    )
}
