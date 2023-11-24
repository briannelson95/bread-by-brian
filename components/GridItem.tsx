"use client"
import { CartContext } from '@/context/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import toast from 'react-hot-toast';

export default function GridItem({menuItem}: {menuItem: {image: string; link: string; title: string; id: number; price: number; limit: number;}}) {
    const {
        image, link, title, id, price, limit,
    } = menuItem;
    
    //@ts-ignore
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        // console.log(menuItem)
        addToCart(menuItem);

        toast('Added to cart', {
            icon: '🍞👍',
        })
    }

    return (
        <div className='w-full space-y-2'>
            <div className='relative'>
                <Link href={link}>
                    {image ? (
                        <div className='rounded-full aspect-square w-full h-auto overflow-hidden bg-center'>
                            <Image
                                src={image}
                                alt={'Alt text for image'}
                                height={1000}
                                width={1000}
                                className='bg-cover'
                            />
                        </div>
                    ) : (
                        <div className='bg-zinc-500 rounded-full aspect-square w-full h-auto' />
                    )}
                </Link>
                <button 
                    className='absolute bottom-0 right-0 bg-yellow-500 text-white font-bold rounded-full z-10 w-8 h-8 flex justify-center items-center'
                    onClick={handleAddToCart}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <div>
                <Link href={link}>
                    <h2 className='text-xl font-bold capitalize w-full text-center'>{title}</h2>
                </Link>
            </div>
        </div>
    )
}
