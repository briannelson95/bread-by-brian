"use client"
import React, { useContext, useState } from 'react'
import Options from './Options'
import Image from 'next/image';
import MainButton from './MainButton';
import { CartContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

export default function ProductInfo({menuItem}: {menuItem: {image: string; link: string; title: string; id: number; price: number; limit: number; description: string; inventory: number;}}) {
    const {
        image, link, title, id, price, limit, description, inventory
    } = menuItem;
    
    const { addToCart }: any = useContext(CartContext)

    const [quantity, setQuantity] = useState(1);
    // console.log('quantity from ProductInfo:', quantity)

    const handleQuantityChange = (newQuantity: number) => {
        // console.log('quantity:', quantity)
        setQuantity(newQuantity)
    }

    const handleAddToCart = () => {
        // console.log("Adding to cart with quantity:", quantity);
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
                        onQuantityChange={handleQuantityChange}
                        maxAmount={limit}
                        inventory={inventory}
                    >
                        <p className='text-xl font-bold'>{quantity}</p>
                    </Options>
                )} 
                
                <div className='grid grid-cols-2 gap-2'>
                    <h1 className='text-3xl font-bold capitalize'>{title}</h1>
                    <div className='flex justify-end items-center'>
                        <p className='text-3xl'>${price.toFixed(2)}</p>
                    </div>
                </div>
                <div>
                    {inventory <= 3 && <p className='text-red-500'>Only {inventory} left this week</p>}
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
