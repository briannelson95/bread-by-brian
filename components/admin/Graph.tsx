"use client"
import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import StackIcon from '../icons/StackIcon';
  
// Register ChartJS components using ChartJS.register
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

var labels: string[] = [];
var today = new Date();
for (var i = 29; i >= 0; i--) {
    var date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    labels.push(date.toLocaleDateString());
}

export default function Graph({ data }: { data?: any }) {
    const consolidatedMap = data.reduce((accumulator: any, item: any) => {
        const date = new Date(item.order_date).toLocaleDateString();
        if (!accumulator[date]) {
          accumulator[date] = {
            x: date,
            total_price: 0,
          };
        }
        accumulator[date].total_price += item.total_price;
        return accumulator;
      }, {});
      
    const consolidatedArray = Object.values(consolidatedMap);
    return (
        <div className='border border-gray-400 rounded-lg px-4 py-4 space-y-4 w-full'>
            <div className='flex gap-2 items-center'>
                <StackIcon />
                <h2 className='text-xl font-bold'>Sales Revenue</h2>
            </div>
            {/* <div className='h-96 w-full'> */}
                <Line
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                data: consolidatedArray,
                                backgroundColor: "#3b82f6",
                                borderColor: '#3b82f6',
                                fill: false,
                                tension: 0.4,
                                parsing: {
                                    yAxisKey: 'total_price'
                                },  
                            },
                        ],
                    }}
                    // options={{
                    //     responsive: true,
                    //     maintainAspectRatio: false,
                    // }}
                />
            {/* </div> */}
            
        </div>
    )
}
