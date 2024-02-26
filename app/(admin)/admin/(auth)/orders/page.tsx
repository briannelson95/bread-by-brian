import CurrentOrders from '@/components/admin/CurrentOrders';
import { supabase } from '@/supabase/lib/supabaseClient'
import Link from 'next/link';
import React from 'react'

export const revalidate = 0;

export default async function OrdersPage() {

    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first))
    var lastday = new Date(curr.setDate(last))

    const { data: currentOrders }: any = await supabase.from('orders')
        .select()
        .order('order_date', { ascending: true })
        // .gte('order_date', firstday.toISOString()) // Greater than or equal to the first day
        // .lte('order_date', lastday.toISOString()); 

    const { data: specialOrders }: any = await supabase.from('special_orders')
        .select('id')
        .eq('completed', false)
        .order('created_at', { ascending: true });

    return (
        <div className="p-4 w-full space-y-2">
            <h1 className="text-2xl font-bold">Orders</h1>
            {specialOrders && (
                <div className='w-full rounded-xl bg-red-400 p-4 text-white font-medium'>
                    <Link href={'/admin/orders/special-orders'}>New Special Order</Link>
                </div>
            )}
            <CurrentOrders currentOrders={currentOrders} />
        </div>
    )
}
