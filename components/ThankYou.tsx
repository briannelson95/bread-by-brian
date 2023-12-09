import { supabase } from '@/supabase/lib/supabaseClient'
import React, { useEffect, useState } from 'react'
import CartCard from './CartCard';

export default function ThankYou({ orderId }: { orderId: number }) {
    const [orderDetails, setOrderDetails]: any = useState();
    const [customerName, setCustomerName] = useState('');

    useEffect(() => {
        supabase.from('orders')
            .select()
            .eq('id', orderId)
            .then(result => {
                if (!result.error) {
                    setCustomerName(result.data[0].customer_name)
                    supabase.from('order_details')
                        .select('order_id, products(id, title, image), quantity')
                        .eq('order_id', orderId)
                        .then(result => {
                            if (!result.error) {
                                setOrderDetails(result.data[0]);
                            }
                        })
                }
            })
    }, [orderId])

    return (
        <div>
            <div className='flex flex-col items-center'>
                <h1 className='text-xl font-medium'>Thank You {customerName}!</h1>
                <p>Your order has been placed</p>
            </div>
        </div>
    )
}
