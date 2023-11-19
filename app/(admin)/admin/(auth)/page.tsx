"use client"
import QuickAdd from "@/components/admin/QuickAdd";
import { redirect } from "next/navigation";
import { useSession } from '@supabase/auth-helpers-react'
import { supabase } from "@/supabase/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export default function AdminPage() {
  const session = useSession();

  const { profile }: any = useUser();

  useEffect(() => {
    if (profile) {
      if (profile.admin) {
          return
      } else if (!profile.admin) {
          redirect('/admin/login');
      }
  }
  })

  if (!session) {
    redirect('/admin/login')
  }
  return (
    <div className="p-4 w-full space-y-2">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <QuickAdd />
    </div>
  )
}