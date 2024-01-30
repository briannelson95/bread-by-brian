"use client"
import { CartContext } from '@/context/AppContext';
import { supabase } from '@/supabase/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import MainButton from './MainButton';

export default function GridItem({menuItem}: {menuItem: {image: string; link: string; title: string; id?: number; price?: number; limit?: number; inventory?: number; tag?: string; promotionId?: number;}}) {
    const {
        image, link, title, id, price, limit, inventory, tag, promotionId,
    } = menuItem;
    const [openPopup, setOpenPopup] = useState(false);
    const [productOptions, setProductOptions]: any = useState(null);
    const [selectedOption, setSelectedOption]: any = useState(null)

    useEffect(() => {
        supabase.from('product_options')
            .select('product_id, name, option_price')
            .eq('product_id', id)
            .then(result => {
                if (!result.error) {
                    if (result.data.length <= 0) {
                        return
                    } else if (result.data.length > 0) {
                        setProductOptions(result.data);
                        setSelectedOption(result.data[1].name)
                    }
                }
            })
    }, [id])
    
    //@ts-ignore
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        if (productOptions !== null) {
            setOpenPopup(true)
        } else {
            addToCart(menuItem, 1, selectedOption);
        }
    }

    const handleChangeSelection = (e: any) => {
        setSelectedOption(e.target.value)
    }

    return (
        <div className={`w-full space-y-2 ${promotionId && 'border-2 border-pink-500 rounded-xl p-2'}`}>
            <div className='relative'>
                {productOptions !== null && (
                    <div className={`${openPopup ? 'block' : 'hidden'} absolute bottom-0 w-full z-20`}>
                        <div className='bg-gray-200 p-4 rounded-xl shadow-md space-y-1'>
                            <p className='text-sm'>Please select an option</p>
                            <select value={selectedOption} onChange={handleChangeSelection}>
                                <option value="" disabled>Select an option</option>
                                    {productOptions.map((option: any, index: number) => (
                                        <option key={index} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                            </select>
                            <MainButton 
                                title={'Add to Cart'} 
                                onClick={() => {
                                    addToCart(menuItem, 1, selectedOption);
                                    setOpenPopup(false);
                                }} 
                            />
                        </div>
                    </div>
                )}
                
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
                {inventory && inventory > 0 ? (
                    <button 
                        className='absolute bottom-0 right-0 bg-yellow-500 text-white font-bold rounded-full z-10 w-8 h-8 flex justify-center items-center'
                        onClick={handleAddToCart}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                ) : ""}
                {tag && (
                    <div className='absolute top-0 left-0 bg-red-500 text-white font-medium text-sm rounded-full z-10 px-2 py-1 flex justify-center items-center capitalize'>
                        {tag}
                    </div>
                )}
            </div>
            <div>
                <Link href={link}>
                    <h2 className='text-xl font-bold capitalize w-full text-center'>{title}</h2>
                </Link>
            </div>
            {inventory == 0 ? (
                <p className='text-gray-400 text-center'>Sold out</p>
            ) : inventory && inventory <= 3 && <p className='text-red-500 text-center'>Only {inventory} left</p>}
        </div>
    )
}
