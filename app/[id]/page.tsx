import MainButton from '@/components/MainButton'
import ProductInfo from '@/components/ProductInfo'
import React from 'react'

export default function ItemPage() {
    return (
        <div className='w-full p-2 relative mb-16'>
            <ProductInfo
                title={'Sourdough bread'}
                price={7.00}
                description='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, quam! Vero expedita, soluta, quod sunt voluptates id officiis, ullam debitis possimus.'
                maxAmount={2}
            />
            <MainButton />
        </div>
    )
}
