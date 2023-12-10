import BackButton from '@/components/BackButton'
import ProductPageInfo from '@/components/admin/ProductPageInfo';
import { supabase } from '@/supabase/lib/supabaseClient';
import React from 'react'

export async function generateStaticParams() {
    const { data: products }: any = await supabase.from('products').select('id');

    return products?.map(({ id }:any) => ({
        id: id.toString(),
    }))
};

export default async function SingleProductPage({ params: { id } }: any ) {
    const { data: product }: any = await supabase
        .from('products')
        .select()
        .eq('id', id);

    const productData = product[0]

    return (
        <div className="p-4 w-full space-y-2" id='productPage'>
            <BackButton text='Back to all products' />
            <ProductPageInfo {...productData} />
        </div>
    )
}
