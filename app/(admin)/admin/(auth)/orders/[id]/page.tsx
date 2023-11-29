import BackButton from '@/components/BackButton'
import { supabase } from '@/supabase/lib/supabaseClient';
import React from 'react'

export async function generateStaticParams() {
    const { data: order_details }: any = await supabase.from('order_details').select('order_id');

    return order_details?.map(({ id }:any) => ({
        id,
    }))
};

export default async function SingleOrderPage({ params: { id } }: any ) {
    const { data: order }: any = await supabase
        .from('orders')
        .select()
        .eq('id', id);

    const { data: order_details }: any = await supabase
        .from('order_details')
        .select('order_id, products(id, title, price, limit), quantity')
        .eq('order_id', id);

    const orderDateString = order[0].order_date;
    const orderDate = new Date(orderDateString)

    const formattedDate = orderDate.toLocaleDateString('en-US');

    return (
        <div className="p-4 w-full space-y-2">
            <BackButton text='Back to all orders' />
            <div className='w-full shadow-lg p-4 rounded-xl bg-gray-100 space-y-1'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-bold'>Order Details</h2>
                    <p>{formattedDate}</p>
                </div>
                <div>
                    <div>
                        <p>Customer Name: {order[0].customer_name}</p>
                        <p className='flex gap-1'>Customer Email: 
                            <a href={`mailto:${order[0].customer_email}`} className='text-blue-500 underline'>
                                {order[0].customer_email}
                            </a>
                        </p>
                    </div>
                    <div>
                        <p>${order[0].total_price}</p>
                    </div>
                </div>
                <div className='space-y-1'>
                    <h2 className='text-xl font-medium'>Items</h2>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    item
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    quantity
                                </th>
                                <th scope="col" className="px-6 py-3 hidden md:block">
                                    price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {order_details && order_details.map((item: any, index: number) => (
                                <tr key={index} className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.products.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.quantity}
                                    </td>
                                    <td className="px-6 py-4 hidden md:block">
                                        ${item.products.price.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
