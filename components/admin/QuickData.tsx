import React from 'react'

export default function QuickData({ title, data, icon }: { title: string; data: any; icon: any; }) {
    return (
        <div className='border border-gray-400 rounded-lg flex justify-between items-center px-4 py-3'>
            <div className='flex gap-2'>
                <div className='w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center text-gray-500'>
                    {icon}
                </div>
                <div>
                    <p className='text-sm text-gray-400'>{title}</p>
                    <p className='text-2xl font-bold'>{data}</p>
                </div>
            </div>
            
        </div>
    )
}
