"use client"

import { supabase } from '@/supabase/lib/supabaseClient'
import React, { useState } from 'react'
import XIcon from '../icons/XIcon';
import { useRouter } from 'next/navigation';

export default function DiscountComponent({data} : any) {
    const [open, setOpen] = useState(false);
    const router = useRouter()

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [amount, setAmount] = useState(0);

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleDelete = async (codeToDelete: any) => {
        const { error } = await supabase.from('discounts')
            .delete()
            .eq('code', codeToDelete);

        router.refresh()
    }

    const handleEnable = async (codeToEnable: string, enabled: boolean) => {
        const { error } = await supabase.from('discounts')
            .update({ enabled: !enabled})
            .eq('code', codeToEnable)

        router.refresh()
    }

    const addDiscount = async () => {
        const { error } = await supabase.from('discounts')
            .insert({
                name,
                code,
                amount,
                enabled: true
            });
            
        setName('');
        setCode('');
        setAmount(0);

        setOpen(false)
    }

    return (
        <div className='relative'>
            <button className='absolute right-0 top-0 bg-blue-500 text-white px-3 py-1 rounded-lg' onClick={handleOpen}>{open ? 'Cancel' : 'Add new'}</button>
            {open && (
                <form className='pt-10 space-y-2'>
                    <div className="relative">
                        <input
                            type='text'
                            name='name'
                            id='name'
                            placeholder=' '
                            value={name}
                            onChange={(e: any) => setName(e.target.value)}
                            className="rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm border appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        />
                        <label 
                            htmlFor="name" 
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                            Name
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type='text'
                            name='code'
                            id='code'
                            placeholder=' '
                            value={code}
                            onChange={(e: any) => setCode(e.target.value)}
                            className="rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm border appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            required
                        />
                        <label 
                            htmlFor="code" 
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                            Code
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type='number'
                            name='amount'
                            id='amount'
                            placeholder=' '
                            value={amount}
                            onChange={(e: any) => setAmount(e.target.value)}
                            className="rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm border appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            required
                        />
                        <label 
                            htmlFor="amount" 
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                            Amount
                        </label>
                    </div>
                    <button 
                        type='submit'
                        className=' bg-blue-500 text-white px-3 py-1 rounded-lg'
                        onClick={addDiscount}
                    >
                        Submit
                    </button>
                </form>
            )}
            <div className='pt-10'>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-xl overflow-hidden">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th className='px-6 py-3' />
                            <th scope='col' className='px-6 py-3'>
                                {'Name'}
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                {'Code'}
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                {'Amount'}
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                {'Enabled'}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item: any, index: number) => (
                            <tr 
                                key={index} 
                                className="bg-white border-b hover:cursor-pointer hover:bg-gray-100 transition-colors duration-300" 
                                // onClick={() => router.push(`/admin/orders/special-orders/${item.id}`)}
                            >
                                <td className='px-6 py-4'>
                                    <button className='hover:text-red-500' onClick={() => handleDelete(item.code)}>
                                        <XIcon />
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4">
                                    {item.code}
                                </td>
                                <td className="px-6 py-4">
                                    {item.amount}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleEnable(item.code, item.enabled)}>
                                        {item.enabled == true ? 'True' : 'False'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
