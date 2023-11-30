import CurrentOrders from '@/components/admin/CurrentOrders';
import { supabase } from '@/supabase/lib/supabaseClient'
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
        .gte('order_date', firstday.toISOString()) // Greater than or equal to the first day
        .lte('order_date', lastday.toISOString()); 

    return (
        <div className="p-4 w-full space-y-2">
            <h1 className="text-2xl font-bold">Orders</h1>
            <CurrentOrders currentOrders={currentOrders} />
        </div>
    )
}
