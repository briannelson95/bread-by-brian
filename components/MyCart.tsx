"use client"
import React from 'react'
import CartCard from './CartCard'
import MainButton from './MainButton'
import CustomerInfo from './CustomerInfo'

export default function MyCart() {
    const total = 21
    return (
        <div className='w-full space-y-2'>
            <h1 className='text-2xl'>My Cart</h1>
            <div className='md:grid md:grid-cols-5 md:gap-6'>
                <div className='w-full space-y-2 md:col-span-3'>
                    <CartCard maxAmount={2} totalItems={2} />
                    <CartCard maxAmount={2} totalItems={1} />
                </div>
                <div className='md:col-span-2 space-y-2'>
                    <div className='flex justify-between p-2'>
                        <p className='font-bold'>Total:</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                    <div className='rounded-lg shadow-md px-2 pt-2'>
                        <CustomerInfo />
                    </div>
                </div>
            </div>
        </div>
    )
}
