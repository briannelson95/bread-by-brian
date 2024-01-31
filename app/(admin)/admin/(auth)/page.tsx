"use client"
import QuickAdd from "@/components/admin/QuickAdd";
import { redirect } from "next/navigation";
import { useSession } from '@supabase/auth-helpers-react'
import { supabase } from "@/supabase/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import PlaceOrder from "@/components/admin/PlaceOrder";
import AlertBanner from "@/components/admin/AlertBanner";
import PageCard from "@/components/admin/PageCard";
import QuickData from "@/components/admin/QuickData";
import MoneyIcon from "@/components/icons/MoneyIcon";
import Dollars from "@/components/icons/Dollars";
import StoreIcon from "@/components/icons/StoreIcon";
import Graph from "@/components/admin/Graph";
import Table from "@/components/admin/Table";
import CalendarIcon from "@/components/icons/CalendarIcon";

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

export default function AdminPage() {
  const session = useSession();

  const { profile }: any = useUser();

  const [revenueData, setRevenueData]: any = useState();
  const [productsSold, setProductsSold]: any = useState([]);
  const [orders, setOrders]: any = useState([]);
  const [currentOrders, setCurrentOrders]: any = useState([]);
  const [open, setOpen] = useState(false);
  const [monthlyRev, setMonthlyRev]: any = useState() 

  // Get the current date in UTC as a Date object
  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth()

  const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Set the current date to the first day of the month
  currentDate.setUTCDate(1);

  // Get the last day of the current month
  const lastDayOfMonth = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 0);
  lastDayOfMonth.setUTCHours(23, 59, 59, 999);

  useEffect(() => {
    if (profile) {
      if (profile.admin) {
          return
      } else if (!profile.admin) {
          redirect('/admin/login');
      }
    }
  });

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

    supabase.from('orders')
      .select('id')
      .eq('completed', true)
      .then((result) => {
        if (!result.error) {
          const orderIds = result.data.map((order) => order.id);
    
          const orderDetailsPromises = orderIds.map((orderId) =>
            supabase.from('order_details')
              .select('quantity')
              .eq('order_id', orderId)
              .then((orderDetailsResult) => {
                if (!orderDetailsResult.error) {
                  return orderDetailsResult.data.map((orderDetail) => orderDetail.quantity);
                } else {
                  throw new Error(`Error fetching order details: ${orderDetailsResult.error.message}`);
                }
              })
          );
    
          Promise.all(orderDetailsPromises)
            .then((allOrderDetails) => {
              // Flatten the array of quantities and update the state
              const flattenedQuantities = allOrderDetails.flat();
              setProductsSold(flattenedQuantities);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.error(`Error fetching order IDs: ${result.error.message}`);
        }
      });

    supabase.from('orders')
      .select('order_date, total_price')
      .eq('paid', true)
      .eq('completed', true)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('order_date', { ascending: false })
      .then(result => {
        if (!result.error) {
          setOrders(result?.data)
        }
      })

    supabase.from('orders')
      .select('completed, customer_name, order_date, total_price')
      .eq('completed', false)
      .order('order_date', { ascending: true })
      .limit(5)
      .then(result => {
        if (!result.error) {
          
          setCurrentOrders(result.data)
        }
      });

    supabase.from('orders')
      .select()
      .eq('paid', true)
      .eq('completed', true)
      .gte('created_at', currentDate.toISOString()) // Greater than or equal to the first day of the month
      .lt('created_at', lastDayOfMonth.toISOString()) // Less than the last day of the month
      .order('created_at', {ascending: true})
      .then(result => {
        // console.log(result)
        if (!result.error) {
          setMonthlyRev(result.data)
        }
      })
    
  }, [])

  // console.log(currentOrders)

  if (!session) {
    redirect('/admin/login')
  }

  const consolidatedTotal = revenueData && revenueData.reduce((accumulator: any, currentValue: any) => {
    return accumulator + currentValue.total_price;
  }, 0);

  const sumOfProducts = productsSold.reduce((partialSum: any, a: any) => partialSum + a, 0)

  const handleOpenOrder = () => {
    setOpen(!open)
  }

  const monthlyTotal = monthlyRev && monthlyRev.reduce((acc: any, currVal: any) => {
    return acc + currVal.total_price;
  }, 0);

  return (
    <div className="py-4 space-y-4 overflow-auto relative">
      {open && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 p-10 z-50">
          {/* <div className="" */}
          <PlaceOrder />
        </div>
      )}
      <PageCard title="Dashboard">
        <div className="grid grid-cols-2 grid-flow-row md:grid-cols-4 gap-2 md:gap-4">
          <div className="col-span-1">
            <QuickData 
              title="Total Revenue" 
              data={`$${consolidatedTotal?.toFixed(2)}`} 
              icon={<MoneyIcon />} 
            />
          </div>
          <div className="col-span-1">
            <QuickData 
              title="Total Sales" 
              data={revenueData?.length} 
              icon={<Dollars />} 
            />
          </div>
          <div className="col-span-1">
            <QuickData 
              title="Products Sold" 
              data={sumOfProducts} 
              icon={<StoreIcon />} 
            />
          </div>
          <div className="col-span-1">
            <QuickData 
              title={`${monthAbbreviations[currentMonth]} Revenue`}
              data={`$${monthlyTotal?.toFixed(2)}`} 
              icon={<CalendarIcon />} 
            />
          </div>
          <div className="col-span-2 md:col-span-4">
            <Graph data={orders} />
          </div>
          <div className="col-span-2 md:col-span-4">
            <Table 
              title="Recent Orders"
              headers={['completed', 'customer_name', 'order_date', 'total_price']} 
              data={currentOrders} 
              button={'Add Order'}
              onClick={handleOpenOrder}
            />
          </div>
        </div>
        <QuickAdd />
        <AlertBanner />
      </PageCard>
      {/* <PageCard title="More">
        
        <PlaceOrder />
        <AlertBanner />
      </PageCard> */}

      
    </div>
  )
}