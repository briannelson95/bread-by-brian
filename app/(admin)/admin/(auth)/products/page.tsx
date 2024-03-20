import ProductsTable from '@/components/admin/ProductsTable'
import Plus from '@/components/icons/Plus';
import { supabase } from '@/supabase/lib/supabaseClient'
import React from 'react'

export const revalidate = 0;

export default async function ProductsPage() {

    const { data: products } = await supabase.from('products')
        .select()
        .order('order', { ascending: true });

    return (
        <div className="p-4 w-full space-y-2">
            <div className='w-full flex justify-between items-center'>
                <h1 className="text-2xl font-bold">Products</h1>
                <button 
                    className='bg-blue-500 text-white rounded-xl px-4 py-2 flex gap-2 justify-center items-center hover:bg-blue-800 transition-colors duration-300'
                >
                    <Plus />
                    Add Product
                </button>
            </div>
            {products && <ProductsTable products={products} />}
            
        </div>
    )
}
