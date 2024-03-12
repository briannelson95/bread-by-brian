"use client"
import OrderListItem from '@/components/OrderListItem';
import { UserContext } from '@/context/UserContext';
import { supabase } from '@/supabase/lib/supabaseClient'
import React, { useContext, useEffect, useState } from 'react'

export default function OrdersPage() {
    const {profile}: any = useContext(UserContext);
    const [orders, setOrders]: any = useState([]);

    useEffect(() => {
        supabase.from('orders')
            .select()
            .eq('customer_email', profile.email)
            .then(result => {
                if (!result.error) {
                    setOrders(result.data)
                }
            })
    }, [])


    return (
        <div className='space-y-2'>
            {orders?.length && orders.map((item: any) => (
                <div key={item.id}>
                    <OrderListItem id={item.id} status={item.completed ? "Complete" : "In Progress"} />
                </div>
            ))}
        </div>
    )
}
