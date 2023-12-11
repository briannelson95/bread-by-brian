"use client"

import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabase/lib/supabaseClient';

export default function PlaceOrder() {
    const [products, setProducts]: any = useState([]);
    const [choice, setChoice]: any = useState(null);
    const [quantity, setQuantity] = useState();
    const [customerName, setCustomerName] = useState('');
    const [cost, setCost]: any = useState()

    useEffect(() => {
        supabase.from('products')
            .select()
            .order('title', {ascending: true})
            .then(result => {
                // console.log(result.data)
                if (!result.error) {
                    setProducts(result.data)
                    // console.log(amountAvailable)
                }
            })
    }, [])

    const handlePriceChange = (item: number, quantity: number) => {
        supabase.from('products')
            .select('price')
            .eq('id', item)
            .then(result => {
                if (!result.error) {
                    // console.log(result.data)
                    const total = result.data[0].price * quantity
                    setCost(total)
                }
            })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        supabase.from('orders')
            .insert({
                customer_name: customerName,
                total_price: cost,
                order_type: 'offline'
            })
            .select('id')
            .then(result => {
                if (!result.error) {
                    supabase.from('order_details')
                        .insert({
                            order_id: result.data[0].id,
                            product_id: choice,
                            quantity,
                        })
                }
            })
    }

    return (
        <div className='bg-gray-200 p-4 rounded-xl'>
            <h2 className='text-xl font-medium'>Place Order</h2>
            <form className='space-y-2'>
                <fieldset>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder=' '
                            id='name'
                            className="rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm border appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            onChange={(e: any) => setCustomerName(e.target.value)}
                            required
                        />
                        <label 
                            htmlFor="name" 
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                            Customer Name
                        </label>
                    </div>    
                </fieldset>
                <fieldset className='flex gap-2'>
                    <div className='flex justify-between w-full'>
                        <div className='flex gap-2'>
                            <div className='flex gap-2 items-center'>
                                <label htmlFor='product'>Product:</label>
                                <select 
                                    value={choice} 
                                    onChange={(e: any) => setChoice(e.target.value)}
                                    className="rounded-md p-4 w-full text-sm border appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                >
                                    <option>Select Product</option>
                                    {products.map((product: any) => (
                                        <option key={product.id} value={product.id}>
                                            {product.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='relative'>
                                <input
                                    type='number'
                                    className='border rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                    placeholder=' '
                                    id='quantity'
                                    onChange={(e: any) => {
                                        setQuantity(e.target.value)
                                        handlePriceChange(choice, e.target.value)
                                    }}
                                    required
                                />
                                <label
                                    htmlFor='quantity'
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Quantity
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className='relative'>
                                <input
                                    type='number'
                                    className='border rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                    placeholder=' '
                                    value={cost}
                                    id='cost'
                                    onChange={(e: any) => setCost(e.target.value)}
                                    required
                                />
                                <label
                                    htmlFor='cost'
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Total Cost
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <button 
                    onClick={handleSubmit}
                    className='bg-blue-500 text-white p-4'
                >
                    Submit Order
                </button>
            </form>
        </div>
    )
}
