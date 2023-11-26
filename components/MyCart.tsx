"use client"
import React, { useContext, useEffect, useState } from 'react'
import CartCard from './CartCard'
import MainButton from './MainButton'
import CustomerInfo from './CustomerInfo'
import { CartContext } from '@/context/AppContext'
import Link from 'next/link'

export default function MyCart() {
    const {cartProducts, clearCart}: any = useContext(CartContext)
    console.log(cartProducts)

    let total = 0;

    cartProducts?.map((p: any) => {
        return total += p.price
    })
    
    return (
        <div className='w-full space-y-2'>
            <h1 className='text-2xl'>My Cart</h1>
            <div className='md:grid md:grid-cols-5 md:gap-6'>
                <div className='w-full space-y-2 md:col-span-3'>
                    {cartProducts?.length === 0 ? (
                        <div className='w-full flex flex-col items-center p-2'>
                            <p>No products in your cart</p>
                            <Link href={'/'} className='underline text-yellow-500'>Browse products</Link>
                        </div>
                    ) : (
                        <div className='w-full space-y-2'>
                            <button className='float-right text-sm text-gray-400' onClick={() => clearCart()}>Clear Cart</button>
                            {cartProducts.map((product: any, index: number) => (
                                <CartCard key={index} {...product} index={index} />
                            ))}
                            <div className='w-full'>
                                <div className='float-right flex gap-4'>
                                    <p className='font-bold'>Total:</p>
                                    <p>${total.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* <CartCard maxAmount={2} totalItems={2} />
                    <CartCard maxAmount={2} totalItems={1} /> */}
                </div>
                <div className='md:col-span-2 space-y-2'>
                    <div className='rounded-lg shadow-md px-2 pt-2'>
                        <CustomerInfo />
                    </div>
                </div>
            </div>
        </div>
    )
}
