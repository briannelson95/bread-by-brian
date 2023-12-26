"use client"

import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabase/lib/supabaseClient';
import toast from 'react-hot-toast';

export default function PlaceOrder() {
    const [products, setProducts]: any = useState([]);
    const [choice, setChoice]: any = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [cost, setCost]: any = useState();

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
    }, []);

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
            });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const { data: orderData }: any = await supabase.from('orders')
            .insert({
                customer_name: customerName,
                total_price: cost,
                order_type: 'offline'
            })
            .select('id');
            
        const orderId = orderData[0].id;

        supabase.from('order_details')
            .insert({
                order_id: orderId,
                product_id: choice,
                quantity
            })
            .then(result => {
                if (!result.error) {
                    setChoice(null);
                    setQuantity(null)
                    setCustomerName('')
                    setCost(null)
                    toast.success('Placed Order')
                }
            });

    }

    return (
        <div className='bg-white p-4 rounded-xl'>
            <h2 className='text-xl font-bold'>Place Order</h2>
            <form className='space-y-2 border border-gray-300 rounded-xl p-4'>
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
                    <div className='space-y-4'>
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
                        <div className='flex justify-between'>
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
                            <button 
                                onClick={handleSubmit}
                                className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                            >
                                Submit Order
                            </button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
