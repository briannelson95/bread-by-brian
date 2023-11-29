"use client"

import { CartContext } from '@/context/AppContext';
import React, { useState, useContext } from 'react'

export default function Options({ maxAmount, inventory, onQuantityChange, children }: { maxAmount: number; inventory: number; onQuantityChange: any; children: React.ReactNode; }) {
    const [liked, setLiked] = useState(false);
    // const [localQuantity, setLocalQuantity] = useState(1);

    const handleLike = () => {
        setLiked(!liked)
    }

    const handleIncrement = () => {
        // Handle the logic to increment the quantity
        onQuantityChange((prevQuantity: number) => prevQuantity + 1);
    };
    
    const handleDecrement = () => {
        // Handle the logic to decrement the quantity
        onQuantityChange((prevQuantity: number) => Math.max(prevQuantity - 1, 1)); // Ensure quantity is not less than 1
    };

    return (
        <div className='w-full flex justify-between'>
            <div className='relative'>
                <div className='bg-yellow-500 text-white rounded-full flex justify-between gap-2 px-2 py-1 items-center'>
                    <button onClick={handleDecrement}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                    </button>
                    {children}
                    <button 
                        onClick={handleIncrement}
                        // disabled={localQuantity == maxAmount}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
                {/* {localQuantity == inventory ? (
                    <div className='absolute top-2 left-24 w-32'>
                        <p className='text-sm'><span className='text-red-600'>*</span>Max per customer</p>
                    </div>
                ) : localQuantity == maxAmount && (
                    <div className='absolute top-2 left-24 w-32'>
                        <p className='text-sm'><span className='text-red-600'>*</span>Max per customer</p>
                    </div>
                )}
                 */}
                
            </div>
            <div>
                <button
                    onClick={handleLike} 
                    className='bg-red-500 rounded-full h-full aspect-square flex justify-center items-center'
                >
                    <span className='text-white'>
                        {liked ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        )}
                    </span>
                </button>
            </div>
        </div>
    )
}
