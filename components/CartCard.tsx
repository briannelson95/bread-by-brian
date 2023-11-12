import Image from 'next/image'
import React, { useState } from 'react'

export default function CartCard({ totalItems, maxAmount }: { totalItems: number; maxAmount: number;}) {
    const [liked, setLiked] = useState(false);
    const [amount, setAmount] = useState(totalItems);

    const handleLike = () => {
        setLiked(!liked)
    }

    const handleAdd = () => {
        if (amount < maxAmount) {
            setAmount(amount + 1)
        }
    }

    const handleSubract = () => {
        if (amount > 0) {
            setAmount(amount - 1)
        }
    }
    return (
        <div className='w-full flex gap-4 pb-4 border-b-2'>
            <div className='rounded-full aspect-square w-32 overflow-hidden bg-center'>
                <Image
                    src={'/bread-image.jpg'}
                    alt={'Alt text for image'}
                    height={1000}
                    width={1000}
                    className='bg-cover'
                />
            </div>
            <div className='w-full flex flex-col justify-between py-2'>
                <div className='flex justify-between'>
                    <p className='font-bold capitalize'>Sourdough Bread</p>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className='flex justify-between'>
                    <div className='flex items-end'>
                        <p>$7.00</p>
                    </div>
                    <div className='relative'>
                        <div className='bg-yellow-500 text-white rounded-full flex justify-between gap-2 px-2 items-center'>
                            <button onClick={handleSubract}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                </svg>
                            </button>
                            <p className='text-lg font-bold'>{amount}</p>
                            <button 
                                onClick={handleAdd}
                                disabled={amount == maxAmount}
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
