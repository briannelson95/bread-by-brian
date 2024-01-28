"use client"

import { supabase } from '@/supabase/lib/supabaseClient';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Plus from '../icons/Plus';

type Product = {
    id: number;
    title: string;
    desc: string;
    price: number;
    limit: number;
    image: string;
    slug: string;
    order: number;
    inventory: number;
    enabled: boolean;
}

export default function ProductPageInfo(props: Product ) {
    const [title, setTitle] = useState(props.title);
    const [slug, setSlug] = useState(props.slug);
    const [desc, setDesc] = useState(props.desc);
    const [price, setPrice] = useState(props.price);
    const [limit, setLimit] = useState(props.limit);
    const [image, setImage]: any = useState(props.image);
    const [inventory, setInventory] = useState(props.inventory);
    const [options, setOptions]: any = useState(null)
    const [isUploading, setIsUploading] = useState(false);
    const [enabled, setEnabled] = useState(props.enabled)

    useEffect(() => {
        supabase.from('product_options')
            .select('name, option_price')
            .eq('product_id', props.id)
            .then(result => {
                if (!result.error) {
                    if (result.data.length < 1) return
                    setOptions(result.data)
                }
            })
    }, [])

    const updateInfo = () => {
        supabase.from('products')
            .update({
                title,
                slug,
                desc,
                price,
                limit,
                image,
                inventory,
                enabled,
            })
            .eq('id', props.id)
            .then(result => {
                // console.log(result)
            })
    }

    const handleAddPhoto = async (e: any) => {
        const upload = e.target.files;
        if (upload.length > 0) {
            setIsUploading(true);
            const file = upload[0];
            const newName = Date.now() + file.name;

            const result = await supabase.storage.from('photos')
                .upload(newName, file)
            if (result.data) {
                const url = process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/photos/' + result.data.path;
                setImage(url)
            } else {
                console.log(result)
            }
            setIsUploading(false)
        }
    }

    const handleToggle = () => {
        setEnabled(!enabled);
        console.log(enabled)
    }

    return (
        <div className='w-full shadow-lg p-4 rounded-xl bg-white space-y-1 md:grid md:grid-cols-7 md:gap-6'>
            <section className='md:col-span-5 space-y-4'>
                <div>
                    <h2 className='text-2xl font-semibold'>
                        <input
                            type='text'
                            className='bg-inherit focus:border-blue-500 leading-none'
                            value={title}
                            id='title'
                            onChange={(e: any) => setTitle(e.target.value)}
                        />
                    </h2>
                    <p className='flex text-sm'>
                        breadbybrian.com/
                        <input
                            type='text'
                            className='text-blue-500 p-0 m-0 bg-inherit'
                            value={slug}
                            id='slug'
                            onChange={(e: any) => setSlug(e.target.value)}
                        />
                    </p>
                </div>
                <textarea
                    value={desc}
                    className='block w-full rounded-xl border p-2 border-gray-300'
                    rows={8}
                    id='desc'
                    onChange={(e: any) => setDesc(e.target.value)}
                />
                <div className='border border-gray-300 rounded-xl p-3 space-y-2'>
                    <h3 className='text-xl font-bold'>Product Options</h3>
                    {options && (
                        <div className='space-y-2'>
                            {options.map((item: any, index: number) => (
                                <div key={index} className='flex gap-2 w-full'>
                                    <div className='relative w-full'>
                                        <input
                                            type='text'
                                            className='border rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                            placeholder=' '
                                            id='name'
                                            // onChange={(e: any) => setPrice(e.target.value)}
                                            value={item.name}
                                        />
                                        <label
                                            htmlFor='price'
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                        >
                                            Name
                                        </label>
                                    </div>
                                    <div className='relative w-full'>
                                        <input
                                            type='number'
                                            className='border rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                            placeholder=' '
                                            id='price'
                                            // onChange={(e: any) => setPrice(e.target.value)}
                                            value={item.option_price ? item.option_price : 0}
                                        />
                                        <label
                                            htmlFor='price'
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                        >
                                            Price
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <button className='bg-blue-500 text-white rounded-xl px-4 py-2 flex justify-center items-center'>
                        <Plus />
                        Add option
                    </button>
                </div>
            </section>
            <section className='col-span-2 space-y-4'>
                <div>
                    <button 
                        className='bg-blue-500 text-white w-full rounded-xl p-2 font-medium'
                        onClick={updateInfo}
                    >
                        Save Changes
                    </button>
                </div>
                <div className='group relative'>
                    <div className='w-full h-44 rounded-xl overflow-hidden bg-cover bg-center' style={{ backgroundImage: `url(${image})`}} />
                    <div className="hidden group-hover:block absolute inset-0 bg-black bg-opacity-50 rounded-xl">
                        <label className='flex justify-center items-center h-full'>
                            <input type='file' className='hidden' onChange={handleAddPhoto} />
                            <p className="text-white">Edit Image</p>
                        </label>
                    </div>
                </div>
                <div className='bg-white w-full rounded-xl p-2 space-y-2 border border-gray-300'>
                    <p className='text-lg font-medium'>More Info</p>
                    <div className='grid grid-cols-7 gap-2'>
                        <p className='col-span-2'>Enabled:</p>
                        <span className='col-span-5'>
                            <div className="relative">
                                <label htmlFor="toggle" className="cursor-pointer">
                                <input
                                    id="toggle"
                                    type="checkbox"
                                    className="hidden"
                                    checked={enabled}
                                    onChange={handleToggle}
                                />
                                <div className={`toggle__background w-12 h-6 bg-${enabled ? 'green' : 'gray'}-400 rounded-full flex items-center p-1`}>
                                    <div className={`toggle__dot w-4 h-4 bg-white rounded-full shadow transition-transform transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                </div>
                                </label>
                            </div>
                        </span>
                    </div>
                    <div className='grid grid-cols-7 gap-2'>
                        <p className='col-span-2'>Inventory:</p>
                        <span className='col-span-5'>
                            <input
                                type='number'
                                value={inventory}
                                className='border w-full text-right'
                                onChange={(e: any) => setInventory(e.target.value)}
                            />
                        </span>
                    </div>
                    <div className='grid grid-cols-7 gap-6'>
                        <p className='col-span-2'>Price:</p>
                        <span className='col-span-5'>
                            <input
                                type='number'
                                value={price.toFixed(2)}
                                className='border w-full text-right'
                                onChange={(e: any) => setPrice(e.target.value.toFixed(2))}
                            />
                        </span>
                    </div>
                    <div className='grid grid-cols-7 gap-2'>
                        <p className='col-span-2'>Limit:</p>
                        <span className='col-span-5'>
                            {props.limit !== null ? (
                                <input
                                    type='number'
                                    value={limit}
                                    className='border w-full text-right'
                                    onChange={(e: any) => setLimit(e.target.value)}
                                />
                            ) : 'No limit'}
                        </span>
                    </div>
                </div>
            </section>
        </div>
    )
}
