"use client"

import { useRouter } from 'next/navigation';
import React from 'react'

export default function Table({ headers, data }: { headers: string[]; data: any[] }) {
    const router = useRouter();

    const formatHeader = (header: string) => {
        return header
          .replace(/_/g, ' ') // Replace underscores with spaces
          .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); // Capitalize each word
    };

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    {headers.map((header: string, index: number) => (
                        <th key={index} scope='col' className='px-6 py-3'>
                            {formatHeader(header)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item: any, index: number) => (
                    <tr 
                        key={index} 
                        className="bg-white border-b hover:cursor-pointer hover:bg-gray-100 transition-colors duration-300" 
                        onClick={() => router.push(`/admin/orders/special-orders/${item.id}`)}
                    >
                        {headers.map((header: string, columnIndex: number) => (
                            <td key={columnIndex} className="px-6 py-4">
                                {item[header]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
