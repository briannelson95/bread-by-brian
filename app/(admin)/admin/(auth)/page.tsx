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