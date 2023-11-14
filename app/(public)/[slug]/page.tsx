import ProductInfo from '@/components/ProductInfo'
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { singleProduct } from '@/sanity/lib/queries';
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation';
import React from 'react'

type Props = {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const query = groq`*[_type == 'products'{ slug }]`;

    const slugs: any[] = await client.fetch(query);
    const slugRoutes = slugs.map((slug) => slug.slug.current);

    return slugRoutes.map(slug => ({
        slug
    }))
}

export default async function ItemPage({params: {slug}}: Props) {
    const product: any = await client.fetch(singleProduct, { slug })
    // console.log(product)

    if (!product) {
        notFound()
    }
    
    return (
        <div className='w-full p-2 relative mb-16'>
            <ProductInfo
                image={urlForImage(product.image).url()}
                title={product.title}
                price={product.price}
                description={product.description}
                maxAmount={product.maxAmount}
            />
        </div>
    )
}
