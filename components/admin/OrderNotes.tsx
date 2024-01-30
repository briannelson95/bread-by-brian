"use client"

import { supabase } from '@/supabase/lib/supabaseClient';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface Props {
    orderNote?: string;
    orderId?: number;
}

export default function OrderNotes(props: Props) {
    const [note, setNote] = useState(props.orderNote)

    const updateNote = (e: any) => {
        e.preventDefault()
        supabase.from('orders')
            .update({
                notes: note
            })
            .eq('id', props.orderId)
            .then(result => {
                // console.log(result)
                if (!result.error) {
                    toast.success('Updated Notes')
                }
            })
    }

    return (
        <form className='w-full'>
            <textarea 
                onChange={(e: any) => setNote(e.target.value)}
                className='w-full p-2 rounded-lg shadow-md relative'
                rows={5}
            >
                {note}
            </textarea>
            <button 
                type='submit' 
                className='bg-blue-500 text-white px-2 py-1 rounded-lg'
                onClick={updateNote}
            >
                    Save
            </button>
        </form>
    )
}
