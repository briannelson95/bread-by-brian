import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProductsTable({ products }: { products: any}) {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Limit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Order
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((item: any, index: any) => (
                        <tr key={item.id} className="bg-white border-b">
                            <Link href={`/admin/products/${item.id}`}>
                            <th scope="row" className="px-6 py-4 flex gap-2 items-center font-medium text-gray-900 whitespace-nowrap">
                                
                                    <Image
                                        src={item.image}
                                        height={1000}
                                        width={1000}
                                        alt={`Image of ${item.title}`}
                                        className='h-8 w-8 rounded'
                                    />
                                    {item.title}
                                
                            </th>
                            </Link>
                            <td className="px-6 py-4">
                                ${item.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                                {item.limit}
                            </td>
                            <td className="px-6 py-4">
                                {item.inventory}
                            </td>
                            <td className="px-6 py-4">
                                {item.order ? item.order : index + 1}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
