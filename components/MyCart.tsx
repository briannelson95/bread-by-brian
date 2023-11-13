"use client"
import React from 'react'
import CartCard from './CartCard'
import MainButton from './MainButton'

export default function MyCart() {
    return (
        <div className='w-full space-y-2'>
            <h1 className='text-2xl'>My Cart</h1>
            <div className='md:grid md:grid-cols-5'>
                <div className='w-full space-y-2 md:col-span-3'>
                    <CartCard maxAmount={2} totalItems={2} />
                    <CartCard maxAmount={2} totalItems={1} />
                </div>
                <div className='md:col-span-2'>
                    <MainButton title='Place Order' />
                </div>
            </div>
        </div>
    )
}
