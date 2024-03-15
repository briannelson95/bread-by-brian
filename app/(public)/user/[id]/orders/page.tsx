"use client"
import OrderListItem from '@/components/OrderListItem';
import { UserContext } from '@/context/UserContext';
import { supabase } from '@/supabase/lib/supabaseClient'
import React, { useContext, useEffect, useState } from 'react'

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

export default function OrdersPage() {
    const {profile}: any = useContext(UserContext);
    const [orders, setOrders]: any = useState([]);

    useEffect(() => {
        supabase.from('orders')
            .select('id, created_at, total_price, delivery, completed, order_details(products(id, title, image), quantity)')
            .eq('customer_email', profile.email)
            .gte('created_at', thirtyDaysAgo.toISOString())
            .order('order_date', { ascending: false })
            .then(result => {
                if (!result.error) {
                    setOrders(result.data)
                }
            })

    }, [])

    console.log(orders)
    return (
        <div className='space-y-2'>
            {orders?.length ? orders.map((item: any) => (
                <div key={item.id}>
                    <OrderListItem 
                        id={item.id} 
                        status={item.completed} 
                        orderDetails={item.order_details}
                        orderDate={item.created_at}
                        totalPrice={item.total_price.toFixed(2)}
                    />
                </div>
            )) : (
                <>No recent orders</>
            )}
        </div>
    )
}
