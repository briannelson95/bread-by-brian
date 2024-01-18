import Table from '@/components/admin/Table'
import { supabase } from '@/supabase/lib/supabaseClient'
import React from 'react'

export default async function SpecialOrderAdmin() {
    const { data: orderData } = await supabase.from('special_orders')
        .select('id, customer_name, customer_email,')
        .eq('complete', false)
        .order('created_at', { ascending: true })
    
    return (
        <section className='p-4 w-full space-y-2'>
            <h1 className='text-2xl font-bold'>Special Orders</h1>
            {orderData && (
                <Table
                    headers={['customer_name', 'customer_email']}
                    data={orderData}
                />
            )}
            
        </section>
    )
}
