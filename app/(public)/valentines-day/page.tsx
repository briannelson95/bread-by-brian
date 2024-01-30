import CountDown from '@/components/CountDown'
import GridItem from '@/components/GridItem'
import { supabase } from '@/supabase/lib/supabaseClient'
import React from 'react'

export default async function page() {
    const { data: promotion }: any = await supabase
        .from('promotions')
        .select()

    const { data: products } = await supabase
        .from('products')
        .select()
        .eq('promotion_id', promotion[0].id)
        .order('created_at', { ascending: true });

    return (
        <div className='sm:max-w-4xl mx-auto px-4 sm:px-0 space-y-4'>
            <div className='bg-pink-500 text-white p-4 rounded-xl flex items-center gap-2 justify-between'>
                <h1 className='text-2xl sm:text-4xl font-bold'>{"Valentine's Day Specials"}</h1>
                <CountDown data={new Date(promotion[0]?.last_day_to_order).toUTCString()} />
            </div>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 max-w-4xl mx-auto px-4'>
                <div className='hidden md:block col-span-1'/>
                {products?.map((item) => (
                    <GridItem
                        key={item.id} 
                        menuItem={{
                            image: item.image,
                            link: item.slug,
                            title: item.title,
                            id: item.id,
                            price: item.price,
                            limit: item.limit,
                            inventory: item.inventory,
                            tag: item.tag,
                        }}            
                    />
                ))}
            </div>
            <div className='p-4 space-y-4 flex flex-col w-full'>
                <h2 className='text-2xl font-bold'>About this Promotion</h2>
                <div className='w-2/3 bg-pink-100 rounded-xl p-4'>
                    <h2 className='text-xl font-medium'>{`💕 Introducing Our Valentine's Day Collection 💕`}</h2>
                    <p>
                        {`We're excited to share our exclusive Valentine's Day collection with you! We've curated a limited-edition selection of treats to make this Valentine's Day truly special.`}
                    </p>
                </div>
                <div className='w-2/3 self-end bg-pink-300 rounded-xl p-4'>
                    <h2 className='text-xl font-medium'>🎁 Limited-Edition Gift Boxes</h2>
                    <p>
                        {`Discover the joy of giving with our beautifully crafted Valentine's Gift Boxes. Available in two sizes, our small box includes a delightful selection of 4 unique treats, while our large box indulges you with a generous assortment of 7 mouthwatering delights.`}
                    </p>
                </div>
            </div>
        </div>
    )
}
