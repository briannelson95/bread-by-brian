"use client"
import { supabase } from '@/supabase/lib/supabaseClient';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function CurrentOrders({ currentOrders }: { currentOrders: any }) {
    const router = useRouter();

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders && currentOrders.map((item: any) => (
                        <tr key={item.id} className="bg-white border-b hover:cursor-pointer hover:bg-gray-100 transition-colors duration-300" onClick={() => router.push(`/admin/orders/${item.id}`)}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {item.id}
                            </th>
                            <td className="px-6 py-4">
                                {item.customer_name}
                            </td>
                            <td className="px-6 py-4">
                                {item.customer_email}
                            </td>
                            <td className="px-6 py-4">
                                {item.order_date}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
