"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import InfoIcon from './icons/InfoIcon';
import XIcon from './icons/XIcon';
import DoughnutChart from './DoughnutChart';

type PunchCardProps = {
    name: string;
    punches: number;
}

export default function PunchCard({ name, punches }: PunchCardProps) {
    const data = punches % 10 === 0 ? 10 : punches % 10;
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const nextProgress = prevProgress + 0.1;
                return nextProgress <= data ? nextProgress : data;
            });
        }, 25);
        return () => clearInterval(interval);
    }, [data]);

    const handleShowInfo = () => {
        setShowInfo(!showInfo)
    }
    return (
        <div className='w-full h-full relative'>
            <div className={`absolute ${showInfo ? 'block' : 'hidden'} right-0 w-full rounded-xl bg-brand-secondary/50 p-2`}>
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
            <div className='w-3/4 md:w-1/2 mx-auto bg-gradient-to-tr from-brand-primary to-white aspect-[3/4] rounded-xl px-3 py-2 pb-4 flex flex-col gap-2 justify-between shadow-md shadow-brand-secondary/50'>
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
                            className='h-14 w-14'
                        />
                    </div>
                    <p className='text-sm'>Buy 10 bread items, <br /> Get 1 FREE Sourdough</p>
                </div>
                <div className='w-full grid gap-4 grid-cols-2 relative place-items-center'>
                    {Array.from({ length: 10 }, (_, index) => (
                        <div key={index} className='border-brand-secondary bg-gradient-to-tr from-brand-secondary to-brand-primary border rounded-full w-10 h-10 relative z-0'>
                            {index + 1 <= data ? (
                                <div className='absolute inset-0 flex items-center justify-center text-lg'>
                                    👍
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
                {/* <DoughnutChart progress={progress} /> */}
            </div>
        </div>
    )
}
