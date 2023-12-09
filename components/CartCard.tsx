import { CartContext } from '@/context/AppContext';
import Image from 'next/image'
import React, { useContext, useState } from 'react'

export default function CartCard({ limit, title, image, price, id, index, quantity, inventory, options }: { limit: number; title: string; image: string; price: number; id: number; index: number; quantity: number; inventory: number; options?: string }) {

    const {removeCartProduct, cartProducts, updateQuantity}: any = useContext(CartContext);

    const handleIncrement = () => {
        updateQuantity(id, quantity + 1, limit, inventory);
    };
    
    const handleDecrement = () => {
        updateQuantity(id, Math.max(quantity - 1, 1), limit, inventory);
    };


    return (
        <div className='w-full flex gap-4 pb-4 border-b-2'>
            <div>
                <div className='rounded-full aspect-square h-24 overflow-hidden bg-center'>
                    <Image
                        src={image}
                        alt={'Alt text for image'}
                        height={1000}
                        width={1000}
                        className='bg-cover'
                    />
                </div>
            </div>
            <div className='w-full flex flex-col justify-between py-2'>
                <div>
                    <div className='flex justify-between'>
                        <p className='font-bold capitalize'>{title}</p>
                        <button onClick={() => removeCartProduct(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {options && (
                        <div>
                            <h4 className='text-sm font-semibold text-gray-600'>Options</h4>
                            <ul className='text-sm list-inside list-disc ml-4 text-gray-500 capitalize'>
                                <li>
                                    {options}
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className='flex justify-between'>
                    <div className='flex items-end'>
                        <p>${price.toFixed(2)}</p>
                    </div>
                    <div className='relative'>
                        <div className='bg-yellow-500 text-white rounded-full flex justify-between gap-2 px-2 items-center'>
                            <button onClick={handleDecrement}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                </svg>
                            </button>
                            <p className='text-lg font-bold'>{quantity}</p>
                            <button 
                                onClick={handleIncrement}
                                disabled={quantity == limit}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
