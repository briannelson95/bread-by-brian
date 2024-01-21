"use client"

import React, { useEffect, useState } from 'react'
import XIcon from '../icons/XIcon';
import { supabase } from '@/supabase/lib/supabaseClient';
import toast from 'react-hot-toast';

interface Request {
    customerName: string;
    customerEmail: string;
    request: string;
    complete: boolean;
}

export default function SpecialRequest(props: Request) {
    const [open, setOpen] = useState(false);
    const [choice, setChoice]: any = useState(null);
    const [products, setProducts]: any = useState()
    const [quantity, setQuantity] = useState(null);
    const [customerName, setCustomerName] = useState(props.customerName);
    const [cost, setCost]: any = useState();
    const [items, setItems]: any = useState([
        { name: '', quantity: 0, price: 0 },
    ]);
    
    const handleAddProduct = () => {
        setItems([...items, { name: '', quantity: 0, price: 0 }]);
    };
    
    const handleRemoveProduct = (index: number) => {
        const updatedProducts = [...items];
        updatedProducts.splice(index, 1);
        setItems(updatedProducts);
    };
    
    const handleInputChange = (index: number, field: any, value: any) => {
        const updatedProducts = [...items];
        updatedProducts[index][field] = value;
        setItems(updatedProducts);
    };
    
    const calculateTotalPrice = () => {
        return products.reduce((total: number, product: any) => {
            const productTotal = product.quantity * product.price;
            return total + productTotal;
        }, 0);
    };

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
                order_type: 'custom'
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

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <>
            <div className='w-full shadow-lg p-4 rounded-xl space-y-1 bg-white'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-bold'>Special Order Details</h2>
                    <button 
                        onClick={handleOpen}
                        className='bg-blue-500 rounded-lg text-white px-4 py-2'
                    >
                        Create Order
                    </button>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <p>Customer Name: {props.customerName}</p>
                        <p className='flex gap-1'>Customer Email: 
                            <a href={`mailto:${props.customerEmail}`} className='text-blue-500 underline'>
                                {props.customerEmail}
                            </a>
                        </p>
                    </div>
                    <div>
                        <p>Complete: <span className={`${props.complete && 'text-green-600'} text-red-500 uppercase`}>{props.complete.toString()}</span></p>
                    </div>
                </div>
                <div className='space-y-1'>
                    <h2 className='text-xl font-medium'>Request</h2>
                    <p>{props.request}</p>
                </div>
            </div>
            {open && (
                <div className='w-full shadow-lg p-4 rounded-xl space-y-1 bg-white'>
                    <form className='space-y-2 border border-gray-300 rounded-xl p-4 grid grid-cols-3'>
                        <fieldset className='col-span-2'>
                            {items.map((item: any, index: number) => (
                                <div key={index} className='space-y-4'>
                                    <div className='flex gap-2'>
                                        <div className='flex gap-2 items-center'>
                                            <label htmlFor='product'>Product:</label>
                                            <select 
                                                value={choice} 
                                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
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
                                                onChange={(e) =>
                                                    handleInputChange(index, 'price', parseFloat(e.target.value) || 0)
                                                }
                                                required
                                            />
                                            <label
                                                htmlFor='quantity'
                                                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                            >
                                                Quantity
                                            </label>
                                        </div>
                                        <button type="button" onClick={() => handleRemoveProduct(index)} className='text-black/60'>
                                            <XIcon />
                                        </button>
                                    </div>
                                </div>
                                // <div key={index}>
                                //     <label>
                                //         Product Name:
                                //         <input
                                //             type="text"
                                //             value={item.name}
                                //             onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                //         />
                                //     </label>
                                //     <label>
                                //         Quantity:
                                //         <input
                                //             type="number"
                                //             value={item.quantity}
                                //             onChange={(e) =>
                                //                 handleInputChange(index, 'quantity', parseInt(e.target.value, 10) || 0)
                                //             }
                                //         />
                                //     </label>
                                //     <label>
                                //         Price:
                                //         <input
                                //             type="number"
                                //             value={item.price}
                                //             onChange={(e) =>
                                //                 handleInputChange(index, 'price', parseFloat(e.target.value) || 0)
                                //             }
                                //         />
                                //     </label>
                                //     <button type="button" onClick={() => handleRemoveProduct(index)}>
                                //         Remove
                                //     </button>
                                // </div>
                            ))}
                            <button className='adminButton' type="button" onClick={handleAddProduct}>
                                Add Product
                            </button>
                        </fieldset>
                        {/* <fieldset className='flex gap-2 col-span-2'>
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
                            </div>
                        </fieldset> */}
                        <fieldset>
                            <div className='flex justify-between'>
                                <div className='relative'>
                                    <input
                                        type='number'
                                        className='border rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                        value={calculateTotalPrice().toFixed(2)}
                                        id='cost'
                                        onChange={(e: any) => setCost(e.target.value)}
                                        required
                                    />
                                    <label
                                        htmlFor='cost'
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                    >
                                        {calculateTotalPrice().toFixed(2)}
                                    </label>
                                </div>
                                <button 
                                    onClick={handleSubmit}
                                    className='adminButton'
                                >
                                    Submit Order
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            )}
        </>
    )
}
