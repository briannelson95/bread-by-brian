import React from 'react'
import Options from './Options'
import Image from 'next/image';
import MainButton from './MainButton';

export default function ProductInfo({ image, title, price, description, maxAmount }: { image?: string; title: string; price: number; description: string; maxAmount: number; }) {
    return (
        <div className='w-full p-2 space-y-2 md:grid md:grid-cols-2 md:gap-6'>
            {image ? (
                <div className='rounded-full aspect-square w-full h-auto overflow-hidden bg-center'>
                    <Image
                        src={image}
                        alt={'Alt text for image'}
                        height={3000}
                        width={3000}
                        priority
                        className='bg-cover'
                    />
                </div>
            ) : (
                <div className='bg-zinc-500 rounded-full aspect-square w-full h-auto' />
            )}
            <div className='space-y-2'>
                <Options maxAmount={maxAmount} />
                <div className='grid grid-cols-2 gap-2'>
                    <h1 className='text-3xl font-bold capitalize'>{title}</h1>
                    <div className='flex justify-end items-center'>
                        <p className='text-3xl'>${price.toFixed(2)}</p>
                    </div>
                </div>
                <div>
                    <h2 className='text-xl font-bold'>
                        Details:
                    </h2>
                    <p>{description}</p>
                </div>
                <MainButton title='Add to Cart' />
            </div>
        </div>
    )
}
