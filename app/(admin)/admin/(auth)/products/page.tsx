import ProductsTable from '@/components/admin/ProductsTable'
import { supabase } from '@/supabase/lib/supabaseClient'
import React from 'react'

export default async function ProductsPage() {

    const { data: products } = await supabase.from('products')
        .select()

    return (
        <div className="p-4 w-full space-y-2">
            <h1 className="text-2xl font-bold">Products</h1>
            <ProductsTable products={products} />
        </div>
    )
}
