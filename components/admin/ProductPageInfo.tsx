"use client"

import { supabase } from '@/supabase/lib/supabaseClient';
import Image from 'next/image';
import React, { useState } from 'react'

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
}

export default function ProductPageInfo(props: Product ) {
    const [title, setTitle] = useState(props.title);
    const [slug, setSlug] = useState(props.slug);
    const [desc, setDesc] = useState(props.desc);
    const [price, setPrice] = useState(props.price);
    const [limit, setLimit] = useState(props.limit);
    const [image, setImage]: any = useState(props.image);
    const [isUploading, setIsUploading] = useState(false);

    const updateInfo = () => {
        supabase.from('products')
            .update({
                title,
                slug,
                desc,
                price,
                limit,
                image,
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

    return (
        <div className='w-full shadow-lg p-4 rounded-xl bg-gray-100 space-y-1 md:grid md:grid-cols-7 md:gap-6'>
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
                <div className='bg-white w-full rounded-xl p-2'>
                    <p className='text-lg font-medium'>Pricing Info</p>
                    <div className='grid grid-cols-6 gap-2'>
                        <p>Price:</p>
                        <span className='col-span-5'>
                            $
                            <input
                                type='number'
                                value={price}
                                className='border'
                                onChange={(e: any) => setPrice(e.target.value)}
                            />
                        </span>
                    </div>
                    <div className='grid grid-cols-6 gap-2'>
                        <p>Limit:</p>
                        <span className='col-span-5'>
                            {props.limit !== null ? (
                                <input
                                    type='number'
                                    value={limit}
                                    className='border'
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
