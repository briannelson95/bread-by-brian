import MainButton from '@/components/MainButton'
import ProductInfo from '@/components/ProductInfo'
import React from 'react'

export default function ItemPage() {
    return (
        <div className='w-full p-2 relative'>
            <ProductInfo />
            <MainButton />
        </div>
    )
}
