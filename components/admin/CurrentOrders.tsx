"use client"
import { supabase } from '@/supabase/lib/supabaseClient';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MoneyIcon from '../icons/MoneyIcon';
import XIcon from '../icons/XIcon';

export default function CurrentOrders({ currentOrders }: { currentOrders: any }) {
    const router = useRouter();
    const [orderList, setOrderList] = useState(currentOrders);

    const handleComplete = (id: number) => {
        supabase.from('orders')
            .update({
                completed: !orderList.find((order: any) => order.id === id).completed,
            })
            .eq('id', id)
            .then(result => {
                if (!result.error) {
                    setOrderList((prevOrders: any) =>
                        prevOrders.map((order: any) =>
                            order.id === id ? { ...order, completed: !order.completed } : order
                    ))
                    router.refresh()
                }
            })
    }

    const incompleteOrders = orderList.filter((item: any) => !item.completed);
    const completedOrders = orderList.filter((item: any) => item.completed);

    const handlePaid = (id: number) => {
        supabase.from('orders')
            .update({
                paid: !orderList.find((order: any) => order.id === id).paid,
            })
            .eq('id', id)
            .then(result => {
                if (!result.error) {
                    setOrderList((prevOrders: any) =>
                        prevOrders.map((order: any) => 
                            order.id === id ? { ...order, paid: !order.paid } : order
                    ))
                    router.refresh()
                }
            })
    }

    return (
        <div className="relative overflow-x-auto space-y-6">
            <div>
                <h2 className="text-xl font-medium mb-2">Incomplete Orders</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Paid
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {incompleteOrders && incompleteOrders.map((item: any) => (
                            <tr 
                                key={item.id} 
                                className="bg-white border-b hover:cursor-pointer hover:bg-gray-100 transition-colors duration-300" 
                            >
                                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                                    <input
                                        className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2'
                                        type='checkbox'
                                        checked={item.completed}
                                        onChange={() => handleComplete(item.id)}
                                    />
                                </td>
                                <td className="px-6 py-4" onClick={() => router.push(`/admin/orders/${item.id}`)}>
                                    {item.customer_name}
                                </td>
                                <td className="px-6 py-4" onClick={() => router.push(`/admin/orders/${item.id}`)}>
                                    {item.order_type}
                                </td>
                                <td className="px-6 py-4" onClick={() => handlePaid(item.id)}>
                                    {item.paid ? (
                                        <div className='flex gap-1 text-green-500 items-center'>
                                            <MoneyIcon />
                                            <p>Paid</p>
                                        </div>
                                    ) : (
                                        <div className='flex gap-1 text-red-500 items-center'>
                                            <XIcon />
                                            <p>Not Paid</p>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2 className="text-xl font-medium mb-2">Completed Orders</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Paid
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedOrders && completedOrders.map((item: any) => (
                            <tr 
                                key={item.id} 
                                className="bg-white border-b hover:cursor-pointer hover:bg-gray-100 transition-colors duration-300" 
                            >
                                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                                    <input
                                        className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2'
                                        type='checkbox'
                                        checked={item.completed}
                                        onChange={() => handleComplete(item.id)}
                                    />
                                </td>
                                <td className="px-6 py-4" onClick={() => router.push(`/admin/orders/${item.id}`)}>
                                    {item.customer_name}
                                </td>
                                <td className="px-6 py-4" onClick={() => router.push(`/admin/orders/${item.id}`)}>
                                    {item.order_type}
                                </td>
                                <td className="px-6 py-4" onClick={() => handlePaid(item.id)}>
                                    {item.paid ? (
                                        <div className='flex gap-1 text-green-500 items-center'>
                                            <MoneyIcon />
                                            <p>Paid</p>
                                        </div>
                                    ) : (
                                        <div className='flex gap-1 text-red-500 items-center'>
                                            <XIcon />
                                            <p>Not Paid</p>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
