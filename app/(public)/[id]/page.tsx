import ProductInfo from '@/components/ProductInfo'
import { supabase } from '@/supabase/lib/supabaseClient'
import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

type Props = {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const { data: products }: any = await supabase.from('products').select('slug');

    return products?.map(({ slug }:any) => ({
        slug,
    }))
};

export async function generateMetadata(
    { params: { id } }: { params: { id: string } },
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const { data: product}: any = await supabase.from('products').select('id, title, desc, image').eq('slug', id);
    const productData = product[0];

    return {
        title: `${productData.title} - Bread by Brian`,
        openGraph: {
            images: productData.image
        }
    }

}

export default async function ItemPage({ params: { id } }: { params: { id: string } }) {
    const { data: product }: any = await supabase.from('products').select().eq('slug', id);
    const productData = product[0];
    console.log(productData)
    
    return (
        <div className='w-full p-2 relative mb-16'>
            <ProductInfo 
                menuItem={{
                    image: productData.image,
                    link: productData.slug,
                    title: productData.title,
                    id: productData.id,
                    price: productData.price,
                    limit: productData.limit,
                    description: productData.desc,
                    inventory: productData.inventory,
                }}                
            />
        </div>
    )
}
