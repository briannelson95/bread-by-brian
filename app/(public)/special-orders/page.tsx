"use client"
import MainButton from '@/components/MainButton';
import { supabase } from '@/supabase/lib/supabaseClient';
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function SpecialOrderPage() {
    const [submitted, setSubmitted] = useState(false);
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [message, setMessage] = useState('');
    const [data, setData]: any = useState({
        name:  '',
        email: '',
        message: '',
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const { data: orderData, error: orderError }: any = await supabase
            .from('special_orders')
            .insert({
                customer_name: data.name,
                customer_email: data.email,
                request: data.message,
            })
            .select('id')

        if (orderError) {
            throw new Error(`Error creating order: ${orderError.message}`);
        }

        const orderId = orderData[0].id;

        // SEND EMAIL
        const response = await fetch('api/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, orderId })
        });

        if (response.status === 200) {
            setData({});
            toast.success('Order Requested')
            setSubmitted(true)
        }
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        console.log(value)
        setData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <section className='w-full p-2 space-y-2 md:grid md:grid-cols-2 md:gap-6 mb-20 md:mb-0'>
            <div className='relative h-full'>
                <div className='rounded-full aspect-square w-full h-auto overflow-hidden bg-center'>
                    <Image
                        src={'/muffins.webp'}
                        alt={'Alt text for image'}
                        height={3000}
                        width={3000}
                        priority
                        className='bg-cover z-0'
                    />
                </div>
                <div className='rounded-full aspect-square w-36 h-36 overflow-hidden bg-center absolute top-0 left-o md:left-6 z-10'>
                    <Image
                        src={'/flambee.webp'}
                        alt={'Alt text for image'}
                        height={1000}
                        width={1000}
                        priority
                        className='bg-cover bg-bottom'
                    />
                </div>
                <div className='rounded-full aspect-square h-36 overflow-hidden bg-center absolute bottom-0 md:bottom-20 right-0 z-10'>
                    <Image
                        src={'/bagels.webp'}
                        alt={'Alt text for image'}
                        height={1000}
                        width={1000}
                        priority
                        className='bg-cover bg-bottom scale-[1.7]'
                    />
                </div>
            </div>
            <div className='space-y-2 overflow-y-scroll'>
                <div className='grid grid-cols-3 gap-2'>
                    <h1 className='text-3xl font-bold capitalize col-span-2'>Special Orders</h1>
                    <div className='flex justify-end items-center'>
                        <p className='text-xl'>Prices Vary</p>
                    </div>
                </div>
                <div>
                    <h2 className='text-xl font-bold'>
                        Details:
                    </h2>
                    <p>Special orders can be fulfilled upon request. If youre interested in placing a special order please complete the form below.</p>
                </div>
                <div>
                    {!submitted ? (
                        <form id='checkout'>
                            <fieldset>
                                <label>Name:</label>
                                <input
                                    type='text'
                                    placeholder='John Smith'
                                    id='name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label>Email:</label>
                                <input
                                    type='email'
                                    placeholder='example@example.com'
                                    id='email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <label>Details:</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell me about what you're looking for"
                                    id='message'
                                    name='message'
                                    value={data.message}
                                    onChange={handleInputChange}
                                    required
                                />
                            </fieldset>
                            <MainButton
                                title='Submit'
                                type='submit'
                                disabled={data.name == '' || data.email == '' || data.message == ''}
                                onClick={handleSubmit}
                            />
                        </form>
                    ) : (
                        <>
                            <h3 className='text-xl font-medium'>Thank you!</h3>
                            <p>I will be in touch shortly about your order.</p>
                        </>
                    )}
                    
                </div>
            </div>
        </section>
    )
}
