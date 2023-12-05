import BackButton from '@/components/BackButton'
import { supabase } from '@/supabase/lib/supabaseClient';
import React from 'react'

export async function generateStaticParams() {
    const { data: order_details }: any = await supabase.from('order_details').select('id');

    return order_details?.map(({ id }: any) => ({
        id: id.toString(),
    }))
};

export default async function SingleSpecialOrderPage({ params: { id } }: any ) {
    const { data: order }: any = await supabase
        .from('special_orders')
        .select()
        .eq('id', id);

    return (
        <div className="p-4 w-full space-y-2">
            <BackButton text='Back to all orders' />
            <div className='w-full shadow-lg p-4 rounded-xl bg-gray-100 space-y-1'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-bold'>Special Order Details</h2>
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
                </div>
                <div className='space-y-1'>
                    <h2 className='text-xl font-medium'>Request</h2>
                    <p>{order[0].request}</p>
                </div>
            </div>
        </div>
    )
}
