import React from 'react'
import Options from './Options'
import Image from 'next/image';

export default function ProductInfo({ image, title, price, description, maxAmount }: { image?: string; title: string; price: number; description: string; maxAmount: number; }) {
    return (
        <div className='w-full p-2 space-y-2'>
            {image ? (
                <Image
                    src={image}
                    alt={'Alt text for image'}
                    height={1000}
                    width={1000}
                    className='rounded-full aspect-square w-full h-auto bg-cover'
                />
            ) : (
                <div className='bg-zinc-500 rounded-full aspect-square w-full h-auto' />
            )}
            <div className='space-y-2'>
                <Options maxAmount={maxAmount} />
                <div className='grid grid-cols-2 gap-2'>
                    <h1 className='text-3xl font-bold capitalize'>{title}</h1>
                    <div className='flex justify-end items-center'>
                        <p className='text-3xl'>${price}</p>
                    </div>
                </div>
                <div>
                    <h2 className='text-xl font-bold'>
                        Details:
                    </h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}
