import { supabase } from '@/supabase/lib/supabaseClient'
import React from 'react'

export default  function Revenue({ revenueData }: { revenueData: any}) {
    const consolidatedTotal = revenueData && revenueData.reduce((accumulator: any, currentValue: any) => {
        return accumulator + currentValue.total_price;
    }, 0);

    return (
        <div className='bg-gray-100 rounded-xl p-4 shadow-md'>
            <h2 className='text-lg font-bold'>Total Revenue</h2>
            <p>${consolidatedTotal?.toFixed(2)}</p>
        </div>
    )
}
