"use client"
import React, { useState } from 'react'

export default function CustomerInfo() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    return (
        <form>
            <h2 className='text-lg font-medium'>My Info</h2>
            <fieldset className='space-y-2'>
                <label htmlFor='name' className='gap-2 items-center grid grid-cols-5'>Name:
                    <input
                        type='text'
                        placeholder='John Smith'
                        className='border rounded-md w-full px-2 py-1 col-span-4'
                        id='name'
                    />
                </label>
                <label htmlFor='email' className='gap-2 items-center grid grid-cols-5'>Email:
                    <input
                        type='text'
                        placeholder='example@example.com'
                        className='border rounded-md w-full px-2 py-1 col-span-4'
                        id='email'
                    />
                </label>
            </fieldset>
        </form>
    )
}
