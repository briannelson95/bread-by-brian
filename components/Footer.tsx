import Image from 'next/image'
import React from 'react'
import InstagramIcon from './icons/InstagramIcon'
import TikTokIcon from './icons/TikTokIcon'

export default function Footer() {
    return (
        <footer className='max-w-4xl mx-auto flex flex-col items-center pb-6 border-t pt-2 gap-4 px-4 md:px-0'>
            <div className='flex gap-8 items-center'>
                <Image
                    src={'/bread-logo.png'}
                    height={500}
                    width={500}
                    alt='logo'
                    className='h-16 w-auto'
                />
                <div className='flex flex-col items-center'>
                    <p>Follow us:</p>
                    <div className='flex gap-4'>
                        <a href='https://www.instagram.com/bread_by_brian/' target='_blank'>
                            <InstagramIcon />
                        </a> 
                        <a href='https://www.tiktok.com/@breadbybrian' target='_blank'>
                            <TikTokIcon />
                        </a> 
                        
                    </div>
                </div>
            </div>
            
            <p className='text-sm text-zinc-400'>
                Disclaimer: Everything is made to order and will be fulfilled no later than the Monday after the order is recieved.
            </p>
        </footer>
    )
}
