import InventoryCard from '@/components/admin/InventoryCard'
import { supabase } from '@/supabase/lib/supabaseClient'
import React from 'react'

export default async function InventoryPage() {
    const { data: products } = await supabase.from('products')
        .select()

    return (
        <div className="p-4 w-full space-y-2">
            <h1 className="text-2xl font-bold">Inventory</h1>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {products?.map((item: any) => (
                    <InventoryCard key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}
