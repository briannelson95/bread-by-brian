"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import InfoIcon from './icons/InfoIcon';
import XIcon from './icons/XIcon';

type PunchCardProps = {
    name: string;
    punches: number;
}

export default function PunchCard({ name, punches }: PunchCardProps) {
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const handleShowInfo = () => {
        setShowInfo(!showInfo)
    }
    return (
        <div className='w-full h-full relative'>
            <div className={`absolute ${showInfo ? 'block' : 'hidden'} right-0 w-3/12 rounded-xl bg-brand-secondary/50 p-2`}>
                <div className='bg-white w-full rounded-lg p-2'>
                    <div className='flex justify-between items-start'>
                        <h3 className='font-medium'>
                            What is the Loyalty Card?
                        </h3>
                        <button onClick={handleShowInfo}>
                            <XIcon />
                        </button>
                    </div>
                    <p>Every time you purchase a bread item, you will recieve 1 punch on your card. When you have 10 punches you earn 1 FREE Soughdough Loaf.</p>
                    <p className='text-sm text-gray-400'><i>Rewards do not stack.</i></p>
                </div>
            </div>
            <div className='w-3/4 md:w-1/2 mx-auto bg-gradient-to-tr from-brand-primary to-white aspect-[3/4] rounded-xl px-3 py-2 pb-8 flex flex-col justify-between shadow-md shadow-brand-secondary/40'>
                <div className=''>
                    <div className='w-full flex justify-between items-center'>
                        <h2 className='text-xl font-semibold flex gap-1 items-center'>
                            Loyalty Card
                            <button onClick={handleShowInfo}>
                                <InfoIcon />
                            </button>
                        </h2>
                        <Image
                            src={'/bread-logo.png'}
                            height={1000}
                            width={1000}
                            alt='logo'
                            className='h-12 w-12'
                        />
                    </div>
                    {name}
                    <p>Buy 10 breads <br /> Get 1 free</p>
                </div>
                <div className='w-full grid gap-4 grid-cols-5 relative'>
                    {Array.from({ length: 10 }, (_, index) => (
                        <div key={index} className='border-brand-secondary bg-brand-secondary/30 border rounded-full w-8 h-8 relative' />
                    ))}
                    <div className='w-full grid gap-4 grid-cols-5 absolute z-10 place-items-center'>
                        {Array.from({ length: punches}, (_, index) => (
                            <div key={index} className='text-lg'>
                                👍
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
