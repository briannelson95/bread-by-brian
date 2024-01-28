import React from 'react'
import HeartAnimation from './HeartAnimation';
import Link from 'next/link';

interface Props {
    bgColor: string;
    textColor: string;
    title: string;
    description: string;
    slug: string;
}

export default function BannerAd(props: Props) {
    return (
        <Link href={props.slug} className='hover:cursor-default'>
            <section className={`w-full bg-pink-500 text-${props.textColor ? props.textColor : 'black'} relative overflow-hidden`}>
                <div className='bg-pink-500/30 w-full relative z-[999]'>
                    <div className='px-4 mx-auto md:max-w-4xl h-full py-6 md:grid md:grid-cols-3 md:gap-4 space-y-4'>
                        <div className='col-span-2 space-y-2'>
                            <h2 className='text-2xl md:text-4xl font-bold'>
                                {props.title}
                            </h2>
                            <div className='md:w-2/3'>
                                <p>
                                    {props.description}
                                </p>
                            </div>
                        </div>
                        <div className='md:flex justify-end items-center'>
                            <Link 
                                href={props.slug}
                                className='bg-white text-brand-secondary font-medium px-4 py-2 rounded-lg shadow-md hover:cursor-pointer'
                            >
                                Explore Products
                            </Link>
                        </div>
                        
                    </div>
                    
                </div>
                <HeartAnimation />
            </section>
        </Link>
    )
}
