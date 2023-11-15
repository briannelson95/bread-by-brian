import ProductInfo from '@/components/ProductInfo'
import React from 'react'

type Props = {
    params: {
        slug: string
    }
}

export default async function ItemPage({params: {slug}}: Props) {
    // const product: any = await client.fetch(singleProduct, { slug })
    // console.log(product)

    // if (!product) {
    //     notFound()
    // }
    
    return (
        <div className='w-full p-2 relative mb-16'>
            <ProductInfo
                image={'/bread-image.jpg'}
                title={'Sourdough bread'}
                price={7}
                description={'Product dectiption'}
                maxAmount={2}
            />
        </div>
    )
}
