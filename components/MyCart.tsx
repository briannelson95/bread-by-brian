"use client"
import React, { useContext, useEffect, useState } from 'react'
import CartCard from './CartCard'
import MainButton from './MainButton'
import { CartContext } from '@/context/AppContext'
import Link from 'next/link'
import { supabase } from '@/supabase/lib/supabaseClient'
import toast from 'react-hot-toast'
import ThankYou from './ThankYou'

export default function MyCart() {
    const {cartProducts, clearCart}: any = useContext(CartContext)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState()
    const [street, setStreet] = useState('')
    const [postal, setPostal] = useState()
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    // const [country, setCountry]= useState('')
    const [isChecked, setIsChecked] = useState(false);
    const [thisOrder, setThisOrder] = useState(null);

    let deliveryFee = 2.5;
    let totalPrice: number

    let total = 0;

    cartProducts?.map((p: any) => {
        return total += p.price
    })

    const subTotal = cartProducts.reduce((acc: any, product: any) => {
        const productTotal = product.price * product.quantity;
        return acc + productTotal;
    }, 0);

    if (!isChecked) {
        totalPrice = subTotal;
    } else {
        totalPrice = subTotal + deliveryFee;
    }

    const [data, setData]: any = useState({
        name:  '',
        email: '',
        phone: '',
        street: '',
        postal: '',
        city: '',
        state: '',
        total: totalPrice,
        cartProducts,
        id: thisOrder
    })

    const handleCheckboxChange = () => {
        // Toggle the value of isChecked when the checkbox is changed
        setIsChecked(!isChecked);
    };

    const handleSubmitOrder = async (e: any) => {
        e.preventDefault()

        const { data: orderData, error: orderError }: any = await supabase
            .from('orders')
            .insert(
                {
                    total_price: totalPrice,
                    customer_name: data.name,
                    customer_email: data.email,
                    customer_phone: phone,
                    customer_street: street,
                    customer_postal: postal,
                    customer_city: city,
                    customer_state: state,
                    order_type: 'web',
                    delivery: isChecked
                }
            )
            .select('id')
        
        if (orderError) {
            throw new Error(`Error creating order: ${orderError.message}`);
        }

        const orderId = orderData[0].id;
        setThisOrder(orderId);

        // SEND EMAIL
        const response = await fetch('api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, orderId })
        });

        if (response.status === 200) {
            setData({});
            // toast.success('Email Sent')
        }

        const orderDetails = cartProducts.map((product: any) =>({
            order_id: orderId,
            product_id: product.id,
            quantity: product.quantity,
            options: product?.options,
        }));

        supabase.from('order_details')
            .insert(orderDetails)
            .then(result => {
                if (!result.error) {
                    clearCart()
                    toast.success('Order Placed')
                }
            })

        for (const product of cartProducts) {
            const { data: currentQuantityData, error: quantityError } = await supabase
                .from('products')
                .select('inventory')
                .eq('id', product.id);

            if (quantityError) {
                throw new Error(`Error retrieving current quantity: ${quantityError.message}`);
            }

            const currentQuantity = currentQuantityData[0].inventory;

            const { error: updateInventoryError } = await supabase
                .from('products')
                .update({
                    inventory: currentQuantity - product.quantity,
                })
                .eq('id', product.id);

            if (updateInventoryError) {
                throw new Error(`Error updating inventory: ${updateInventoryError.message}`);
            }

        }

    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    return (
        <div className='w-full space-y-2'>
            {thisOrder == null ? (
                <>
                    <h1 className='text-2xl'>My Cart</h1>
                    <div className='md:grid md:grid-cols-2 md:gap-6'>
                        <div className='w-full space-y-2 md:col-span-1'>
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
                                        <div className='md:float-right flex md:flex-col md:gap-4 flex-col items-end'>
                                            <div className='flex gap-2'>
                                                <p className='text-gray-400'>Subtotal:</p>
                                                <p>${subTotal.toFixed(2)}</p>
                                            </div>
                                            <div className='flex gap-2'>
                                                <div className='flex gap-1 items-center'>
                                                    <input 
                                                        type='checkbox' 
                                                        id='delivery'
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange} 
                                                    />
                                                    <label htmlFor='delivery'>Delivery</label>
                                                </div>
                                                <p className={`${isChecked ? 'block' : 'hidden'}`}>$2.50</p>
                                            </div>
                                            <div className='flex gap-2'>
                                                <p className='font-bold'>Total:</p>
                                                <p>${totalPrice.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='md:col-span-1 space-y-2'>
                            <div className='rounded-lg shadow-md p-4'>
                                <form id='checkout'>
                                    <h2 className='text-lg font-medium'>My Info</h2>
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
                                    {isChecked && (
                                        <fieldset>
                                            <h3 className='font-medium'>Address</h3>
                                            <label>Phone:</label>
                                            <input
                                                disabled={!isChecked}
                                                type="tel" placeholder="Phone"
                                                onChange={(e: any) => setPhone(e.target.value)}
                                            />
                                            <label>Street address</label>
                                            <input
                                                disabled={!isChecked}
                                                type="text" placeholder="Street address"
                                                onChange={(e: any) => setStreet(e.target.value)}
                                            />
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                <label>Postal code</label>
                                                <input
                                                    disabled={!isChecked}
                                                    type="text" placeholder="Postal code"
                                                    onChange={(e: any) => setPostal(e.target.value)}
                                                />
                                                </div>
                                                <div>
                                                    <label>City</label>
                                                    <input
                                                        disabled={!isChecked}
                                                        type="text" placeholder="City"
                                                        onChange={(e: any) => setCity(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                                <label>State</label>
                                                <input
                                                    disabled={!isChecked}
                                                    type="text" placeholder="State"
                                                    onChange={(e: any) => setState(e.target.value)}
                                                />
                                                {/* s */}
                                        </fieldset>
                                    )}
                                    <MainButton 
                                        title={`Place Order ${totalPrice !== 0 ? `$${totalPrice && totalPrice.toFixed(2)}` : ''}`} 
                                        noShadow 
                                        onClick={handleSubmitOrder} 
                                        disabled={totalPrice == 0} 
                                        type={'submit'}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : thisOrder !== null && (
                <>
                    <ThankYou orderId={thisOrder} />
                </>
            )}
        </div>
    )
}
