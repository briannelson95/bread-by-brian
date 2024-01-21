import BackButton from '@/components/BackButton'
import SpecialRequest from '@/components/admin/SpecialRequest';
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
            <SpecialRequest 
                customerName={order[0].customer_name} 
                customerEmail={order[0].customer_email} 
                request={order[0].request}
                complete={order[0].complete}
            />
        </div>
    )
}
