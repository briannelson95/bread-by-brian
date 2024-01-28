import CountDown from '@/components/CountDown'
import { supabase } from '@/supabase/lib/supabaseClient'
import React from 'react'

export default async function page() {
    const { data: promotion }: any = await supabase
    .from('promotions')
    .select()
    // .eq('enabled', true)
    return (
        <div className='md:max-w-4xl mx-auto'>
            <div className='bg-pink-500 text-white p-4 rounded-xl flex justify-between'>
                <h1 className='text-4xl font-bold'>{"Valentine's Day Specials"}</h1>
                <CountDown data={new Date(promotion[0]?.last_day_to_order).toUTCString()} />
            </div>
            <div className='p-4 space-y-4 flex flex-col w-full'>
                <div className='w-2/3'>
                    <h2 className='text-xl font-medium'>{`💕 Introducing Our Valentine's Day Collection 💕`}</h2>
                    <p>
                        {`We're excited to share our exclusive Valentine's Day collection with you! We've curated a limited-edition selection of treats to make this Valentine's Day truly special.`}
                    </p>
                </div>
                <div className='w-2/3 self-end'>
                    <h2 className='text-xl font-medium'>🎁 Limited-Edition Gift Boxes</h2>
                    <p>
                        {`Discover the joy of giving with our beautifully crafted Valentine's Gift Boxes. Available in two sizes, our small box includes a delightful selection of 4 unique treats, while our large box indulges you with a generous assortment of 6 mouthwatering delights.`}
                    </p>
                </div>
            </div>
        </div>
    )
}
