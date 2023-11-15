"use client"
import React, { useState } from 'react'

export default function QuickAdd() {
    const [isLimit, setIsLimit]: any = useState(false);

    const handleCheck = (e: any) => {
        setIsLimit(!isLimit)
    }

    return (
        <section className='w-full border-2 border-green-500 rounded-md p-2'>
            <h2>Quick Add</h2>
            <form>
                <input
                    type='text'
                    className='border rounded px-2 py-1'
                    placeholder='Title'
                />
                <textarea
                    rows={3}
                    className='border rounded px-2 py-1'
                    placeholder='Description'
                />
                <input
                    type='number'
                    className='border rounded px-2 py-1'
                    placeholder='Price'
                />
                <input
                    type='file'
                    className='border rounded px-2 py-1'
                    placeholder='Image'
                />
                <fieldset className='flex gap-2 items-center'>
                    <label htmlFor='limit'>
                        Limit Ammount per Person?
                    </label>
                    <input
                        type='checkbox'
                        id='limit'
                        onChange={handleCheck}
                        checked={isLimit}
                    />
                </fieldset>
                {isLimit && (
                    <fieldset className={``}>
                        <input
                            type='number'
                            className='border rounded px-2 py-1'
                            placeholder='Amount'
                            required={isLimit}
                        />
                    </fieldset>
                )}
                
            </form>
        </section>
    )
}
