"use client"

import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabase/lib/supabaseClient';

export default function PlaceOrder() {
    const [products, setProducts]: any = useState([]);
    const [choice, setChoice]: any = useState(null);
    const [amountAvailable, setAmountAvailable]: any = useState(null);
    const [customerName, setCustomerName] = useState('');

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

    const onSelect = async (value: any) => {
        setChoice(value);
        // console.log(value)
        supabase.from('products')
            .select('inventory')
            .eq('id', choice)
            .then(result => {
                // console.log(amountAvailable)
                if (!result.error) {
                    setAmountAvailable(result.data[0].inventory)
                    // console.log(result.data[0].inventory)
                }
            })
    };


    return (
        <div>
            <h2 className='text-xl font-medium'>Place Order</h2>
            <form>
                <fieldset>
                    <label>Customer Name:</label>
                    <input
                        type='text'
                        placeholder='John Smith'
                        id='name'
                        // onChange={(e: any) => setName(e.target.value)}
                        required
                    />
                </fieldset>
                <fieldset className='flex gap-2'>
                    <div className='flex gap-2'>
                        <label htmlFor='product'>Product:</label>
                        <select value={choice} onChange={(e) => onSelect(e.target.value)}>
                            <option>Select Product</option>
                            {products.map((product: any) => (
                                <option key={product.id} value={product.id}>
                                    {product.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex gap-2'>
                        <label htmlFor='quantity'>Quantity:</label>
                        <select>
                            {Array.from({ length: amountAvailable }, (_, index) => (
                                <option key={index} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
