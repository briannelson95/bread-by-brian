"use client"
import MyCart from '@/components/MyCart'
import { CartContext } from '@/context/AppContext'
import { supabase } from '@/supabase/lib/supabaseClient';
import React, { useContext, useEffect, useState } from 'react'

export default function CartPage() {
    const {cartProducts}: any = useContext(CartContext);
    console.log(cartProducts)

    const [availableProductInv, setAvailableProductInv]: any = useState();

    useEffect(() => {
        supabase.from('products')
            .select('id, title, inventory')
            .then(result => {
                if (!result.error) {
                    setAvailableProductInv(result.data)
                }
            })
    }, [])

    return (
        <div className='w-full p-2 mb-16'>
            <MyCart />
        </div>
    )
}
