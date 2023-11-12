import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function GridItem({ image, title, link }: { image?: string; title: string; link: string;}) {
    return (
        <div className='w-full space-y-2'>
            <div className='relative'>
                <Link href={link}>
                    {image ? (
                        <div className='rounded-full aspect-square w-full h-auto overflow-hidden bg-center'>
                            <Image
                                src={image}
                                alt={'Alt text for image'}
                                height={1000}
                                width={1000}
                                className='bg-cover'
                            />
                        </div>
                    ) : (
                        <div className='bg-zinc-500 rounded-full aspect-square w-full h-auto' />
                    )}
                </Link>
                <button className='absolute bottom-0 right-0 bg-yellow-500 text-white font-bold rounded-full z-10 w-8 h-8 flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <div>
                <Link href={link}>
                    <h2 className='text-xl font-bold capitalize w-full text-center'>{title}</h2>
                </Link>
            </div>
        </div>
    )
}
