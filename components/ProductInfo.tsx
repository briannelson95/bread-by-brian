"use client"
import React, { useContext, useEffect, useState } from 'react'
import Options from './Options'
import Image from 'next/image';
import MainButton from './MainButton';
import { CartContext } from '@/context/AppContext';
import { supabase } from '@/supabase/lib/supabaseClient';
import { calculateTotalPriceWithDiscount } from '@/utils/pricing';

export default function ProductInfo({menuItem}: {menuItem: MenuItem}) {
    const {
        image, link, title, id, price, limit, description, inventory
    } = menuItem;
    const [options, setOptions]: any[] = useState();
    const [selectedOption, setSelectedOption]: any = useState(null)
    
    useEffect(() => {
        supabase.from('product_options')
            .select('id, name, option_price')
            .eq('product_id', id)
            .then(result => {
                if (!result.error) {
                    if (result.data.length <= 0) {
                        return
                    } else if (result.data.length > 0) {
                        setOptions(result.data)
                        setSelectedOption(result.data[1].name)
                    }
                }
            })
    }, [id])

    const handleChangeSelection = (e: any) => {
        setSelectedOption(e.target.value)
    }
    
    const { addToCart }: any = useContext(CartContext)

    const [quantity, setQuantity] = useState(1);
    // console.log('quantity from ProductInfo:', quantity)

    const handleQuantityChange = (newQuantity: number) => {
        // console.log('quantity:', quantity)
        setQuantity(newQuantity)
    }

    const handleAddToCart = () => {
        const total = calculateTotalPriceWithDiscount(price, quantity, title);
        addToCart(menuItem, quantity, selectedOption, total);
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
                        quantity={quantity}
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
                    {inventory <= 3 && inventory > 0 && <p className='text-red-500'>Only {inventory} left this week</p>}
                    <h2 className='text-xl font-bold'>
                        Details:
                    </h2>
                    <p>{description}</p>
                </div>
                {options?.length > 0 && (
                    <div>
                        <select value={selectedOption} onChange={handleChangeSelection}>
                            <option value="" disabled>Select an option</option>
                                {options.map((option: any, index: number) => (
                                    <option key={index} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                )}
                <MainButton 
                    title={`${inventory > 0 ? 'Add to Cart' : 'Sold Out'}`}
                    onClick={handleAddToCart}
                    disabled={inventory <= 0}
                />
            </div>
        </div>
    )
}
