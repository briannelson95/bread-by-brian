"use client"
import { supabase } from '@/supabase/lib/supabaseClient';
import React, { useState } from 'react';

export default function QuickAdd() {
    const [isLimit, setIsLimit]: any = useState(false);
    const [isOptions, setIsOptions]: any = useState(false);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice]: any = useState(null);
    const [limit, setLimit]: any = useState(null);
    const [image, setImage]: any = useState(null);
    const [options, setOptions]: any[] = useState([''])

    const [isUploading, setIsUploading] = useState(false);

    const handleCheck = (e: any) => {
        setIsLimit(!isLimit)
    }

    const handleOptions = () => {
        setIsOptions(!isOptions)
    }

    const handleAddOption = () => {
        setOptions([ ...options, ''])
    }

    const handleOptionChange = (index: number, value: string) => {
        const updatedOption = [...options];
        updatedOption[index] = value;
        setIsOptions(updatedOption)
    }

    const addPhoto = async (e: any) => {
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

    const handleSubmit = () => {
        supabase.from('products')
            .insert({
                title,
                desc,
                price,
                limit,
                image
            })
            .then(result => {
                if (!result.error) {
                    setTitle('');
                    setDesc('');
                    setPrice(null);
                    setLimit(null);
                    setImage(null);
                }
            })
    }

    return (
        <section className='bg-gray-200 w-full rounded-lg p-4 shadow-md'>
            <h2 className='text-lg font-medium'>Add Item</h2>
            <form className='flex flex-col gap-2 relative'>
                <div className="relative">
                    <input 
                        type="text" 
                        id="title" 
                        className="rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm border appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" "
                        onChange={(e: any) => setTitle(e.target.value)}
                        required
                    />
                    <label 
                        htmlFor="title" 
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                        Title
                    </label>
                </div>
                <div className='relative'>
                    <textarea
                        rows={3}
                        className='border rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=' '
                        id='description'
                        onChange={(e: any) => setDesc(e.target.value)}
                    />
                    <label
                        htmlFor='description'
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                        Description
                    </label>
                </div>
                <fieldset className='grid grid-cols-2 gap-2'>
                    <div className='relative'>
                        <input
                            type='number'
                            className='border rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            placeholder=' '
                            id='price'
                            onChange={(e: any) => setPrice(e.target.value)}
                            required
                        />
                        <label
                            htmlFor='price'
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                            Price
                        </label>
                    </div>
                    <div className='grid grid-cols-4 gap-2'>
                        <div className='flex gap-2 items-center'>
                            <input
                                type='checkbox'
                                id='limit'
                                onChange={handleCheck}
                                checked={isLimit}
                            />
                            <label htmlFor='limit'>
                                Limit Amount
                            </label>
                        </div>
                        {isLimit && (
                            <div className="relative col-span-3">
                                <input 
                                    type="number" 
                                    id="limit" 
                                    className="rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm border appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    onChange={(e: any) => setLimit(e.target.value)}
                                />
                                <label 
                                    htmlFor="limit" 
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Amount
                                </label>
                            </div>
                        )}
                    </div>
                </fieldset>

                <fieldset>
                    <div className='flex gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='options'
                            onChange={handleOptions}
                            checked={isOptions}
                        />
                        <label htmlFor='options'>
                            Add Options
                        </label>
                    </div>
                    {isOptions && (
                        <div>
                            {options.map((option: string, index: number) => (
                                <div key={index} className='relative'>
                                    <input
                                        type='text'
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        placeholder=" "
                                        className='border rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                    />
                                    <label
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"     
                                    >
                                        Option
                                    </label>
                                </div>
                            ))}
                            <button onClick={handleAddOption}>Add more</button>
                        </div>
                    )}
                </fieldset>
                
                <input
                    type='file'
                    className='border rounded-md px-2 py-1'
                    placeholder='Image'
                    onChange={addPhoto}
                    required
                />

                <button 
                    onClick={handleSubmit}
                    className='bg-blue-500 rounded-md px-2 py-1 text-white font-medium'
                >
                    Submit
                </button>
            </form>
        </section>
    )
}
