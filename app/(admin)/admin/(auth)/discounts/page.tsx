import DiscountComponent from '@/components/admin/DiscountComponent'
import { supabase } from '@/supabase/lib/supabaseClient'
import React from 'react'

export default async function DiscountPage() {
    const { data: dicounts } = await supabase.from('discounts')
        .select('name, code, amount, enabled')

    // console.log(dicounts)

    return (
        <div className="p-4 w-full space-y-2">
            <h1 className="text-2xl font-bold">Discounts</h1>
            <DiscountComponent
                data={dicounts}
            />
        </div>
    )
}
