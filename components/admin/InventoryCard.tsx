"use client"
import { supabase } from '@/supabase/lib/supabaseClient';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function InventoryCard({ image, title, quantity, id }: { image: string; title: string; quantity: number; id: number; }) {
    const [newQuantity, setNewQuantity]: any = useState(quantity);
    
    const updateInventory = () => {
        supabase.from('products')
            .update({
                inventory: newQuantity
            })
            .eq('id', id)
            .then(result => {
                console.log(result)
            })
    }

    return (
        <div className='rounded-xl shadow-lg p-2 grid grid-cols-3 gap-2'>
            <Image
                src={image}
                height={1000}
                width={1000}
                alt={`Image of ${title}`}
                className='rounded-lg w-20'
            />
            <div className='col-span-2'>
                <h2 className='text-lg font-medium'>{title}</h2>
                <div className='relative'>
                    <input
                        type='number'
                        className='border rounded px-2.5 pb-2.5 pt-5 w-full text-sm appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        id='quantity'
                        onChange={(e: any) => setNewQuantity(e.target.value)}
                        required
                        value={newQuantity}
                    />
                    <label
                        htmlFor='quantity'
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                        Quantity
                    </label>
                </div>
            </div>
            <button 
                onClick={updateInventory}
                className='col-span-3 bg-blue-500 text-white rounded-lg py-1'>
                Save
            </button>
        </div>
    )
}
