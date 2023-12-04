"use client"
import QuickAdd from "@/components/admin/QuickAdd";
import { redirect } from "next/navigation";
import { useSession } from '@supabase/auth-helpers-react'
import { supabase } from "@/supabase/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import PlaceOrder from "@/components/admin/PlaceOrder";
import Fulfillment from "@/components/admin/Fulfillment";
import Revenue from "@/components/admin/Revenue";

export default function AdminPage() {
  const session = useSession();

  const { profile }: any = useUser();

  const [revenueData, setRevenueData]: any = useState();

  useEffect(() => {
    if (profile) {
      if (profile.admin) {
          return
      } else if (!profile.admin) {
          redirect('/admin/login');
      }
    }
  })

  useEffect(() => {
    supabase.from('orders')
      .select('total_price')
      .eq('paid', true)
      .eq('completed', true)
      .then(result =>{
        if (!result.error) {
          setRevenueData(result.data)
        }
      })
  }, [])

  if (!session) {
    redirect('/admin/login')
  }
  return (
    <div className="p-4 w-full space-y-2">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* <Fulfillment /> */}
      <section className="grid grid-cols-2 sm:grid-cols-5">
        <Revenue revenueData={revenueData} />
      </section>
      <QuickAdd />
      <PlaceOrder />
    </div>
  )
}