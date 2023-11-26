"use client"
import React, { useContext } from 'react'
import Options from './Options'
import Image from 'next/image';
import MainButton from './MainButton';
import { CartContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

export default function ProductInfo({menuItem}: {menuItem: {image: string; link: string; title: string; id: number; price: number; limit: number; description: string; inventory: number;}}) {
    const {
        image, link, title, id, price, limit, description, inventory
    } = menuItem;
    
    const {addToCart, quantity}: any = useContext(CartContext)

    console.log(quantity)

    const handleAddToCart = () => {
        // console.log(menuItem)
        addToCart(menuItem, quantity);

        toast('Added to cart', {
            icon: '🍞👍',
        })
    }

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
                {inventory > 0 && (
                    <Options 
                        maxAmount={limit}
                        inventory={inventory}
                    />
                )} 
                
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
                <MainButton 
                    title={`${inventory > 0 ? 'Add to Cart' : 'Sold Out'}`}
                    onClick={handleAddToCart}
                    disabled={inventory <= 0}
                />
            </div>
        </div>
    )
}
