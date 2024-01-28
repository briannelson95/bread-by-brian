import React from 'react'
import HeartSolidIcon from './icons/HeartSolidIcon'

export default function HeartAnimation() {
    return (
        <div className='border-white absolute w-screen z-10 top-0 h-full'>
            <div className="relative w-full h-full">
                <div className='absolute w-full animate-float-30 text-pink-700'>
                    <HeartSolidIcon
                        w='20'
                        h='20'
                    />
                </div>
                <div className='absolute w-full animate-float-24 bottom-0 text-white'>
                    <HeartSolidIcon
                        w='12'
                        h='12'
                    />
                </div>
                <div className='absolute w-full animate-float-40 text-red-400 top-10'>
                    <HeartSolidIcon
                        w='16'
                        h='16'
                    />
                </div>
                <div className='absolute w-full animate-float-50 text-pink-800 bottom-0'>
                    <HeartSolidIcon
                        w='20'
                        h='20'
                    />
                </div>
                <div className='absolute w-full animate-float-36 text-white top-0'>
                    <HeartSolidIcon
                        w='8'
                        h='8'
                    />
                </div>
            </div>
        </div>
    )
}
