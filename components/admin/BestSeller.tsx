import React from 'react'
import FireIcon from '../icons/FireIcon'
import Link from 'next/link'
import Image from 'next/image'

export default function BestSeller({data}: any) {
    return (
        <div className='border border-gray-400 rounded-lg px-4 py-4 space-y-4 w-full h-full'>
            <div className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                    <FireIcon />
                    <h2 className='sm:text-md md:text-xl font-bold'>Top Selling Products</h2>
                </div>
                <Link 
                    href={'/admin/products'}
                    className='px-2 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300'
                >
                    See all Products
                </Link>
            </div>
            <div className='space-y-2'>
                {data.length > 0 && data.map((item: any, index: number) => (
                    <div key={index} className='flex justify-between border-b'>
                        <div className='flex gap-4 items-center'>
                            <Image
                                src={item.image}
                                alt={``}
                                width={500}
                                height={500}
                                className='h-10 w-10 rounded border'
                            />
                            <div>
                                <p className='font-medium'>{item.title}</p>
                                <p className='text-sm text-gray-400'>{item.total_quantity} Sales</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
