import React from 'react'
import HeartAnimation from './HeartAnimation';
import Link from 'next/link';
import CountDown from './CountDown';

interface Props {
    bgColor: string;
    textColor: string;
    title: string;
    description: string;
    slug: string;
    date?: any
}

export default function BannerAd(props: Props) {
    return (
        <Link href={props.slug} className='hover:cursor-default'>
            <section className={`w-full bg-pink-500 text-${props.textColor ? props.textColor : 'black'} relative overflow-hidden`}>
                <div className='bg-pink-500/30 w-full relative z-[999]'>
                    <div className='px-2 md:px-0 mx-auto md:max-w-4xl h-full py-4 md:grid md:grid-cols-3 md:gap-2 space-y-4 md:space-y-0'>
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
                        <div className='col-span-1 w-full flex md:flex-col md:justify-end md:h-full gap-2 md:gap-0'>
                            <div className='md:w-full'>
                                <CountDown
                                    data={props.date}
                                />
                            </div>
                            <div className='md:mt-3 md:flex md:justify-end mt-2'>
                                <Link 
                                    href={props.slug}
                                    className='bg-white text-brand-secondary font-semibold px-4 md:px-6 py-2 rounded-lg shadow-md hover:cursor-pointer justify-self-center self-baseline'
                                >
                                    Order Now
                                </Link>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                <HeartAnimation />
            </section>
        </Link>
    )
}
