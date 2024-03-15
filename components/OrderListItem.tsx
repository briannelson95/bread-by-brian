import React from 'react'

type Product = {
    id: any,
    image: string;
    title: string;
}

type OrderDetails = {
    product: Product[];
    quantity: number;
}

type OrderListItemProps = {
    id: string;
    status: boolean;
    orderDetails: any;
    orderDate: string;
    totalPrice: number;
}

export default function OrderListItem(props: OrderListItemProps) {
    const orderDateString = props.orderDate;
    const orderDate = new Date(orderDateString)

    const formattedDate = orderDate.toLocaleDateString('en-US');
    return (
        <div className='shadow-md shadow-brand-secondary/30 p-2 rounded-lg'>
            <div className='flex w-full justify-between'>
                <p className='text-sm'>Order #{props.id}</p>
                <p className='text-sm'>Status: <span className={props.status ? 'text-green-600' : 'text-brand-primary'}>{props.status ? "Complete" : "In Progress"}</span></p>
            </div>
            <div className='flex justify-between'>
                <p className='text-sm'>Order Date {formattedDate}</p>
                <p className='text-sm'>${props.totalPrice}</p>
            </div>
            <div className='space-y-2'>
                <p>Items in this order:</p>
                <div className='px-4 flex flex-col gap-2'>
                    {props.orderDetails.length && props.orderDetails.map((details: any, index: number) => (
                        <div key={index} className='flex gap-2 justify-between border-b pb-1 items-center'>
                            <div className='flex gap-2 items-center'>
                                <img src={details.products.image} className='h-10 w-10 rounded-full' />
                                <p>{details.products.title}</p>
                            </div>
                            <p>Amount: {details.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
