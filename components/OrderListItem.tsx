import React from 'react'

type OrderListItemProps = {
    id: string;
    status: any
}

export default function OrderListItem(props: OrderListItemProps) {
    return (
        <div className='shadow-md shadow-brand-secondary/30 p-2 rounded-lg'>
            <div className='flex w-full justify-between'>
                <p className='text-sm'>Order #{props.id}</p>
                <p className='text-sm'>Status: {props.status}</p>
            </div>
        </div>
    )
}
