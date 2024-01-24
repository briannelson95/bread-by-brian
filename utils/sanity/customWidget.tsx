import Graph from "@/components/admin/Graph";
import Dollars from "@/components/icons/Dollars";
import MoneyIcon from "@/components/icons/MoneyIcon";
import StoreIcon from "@/components/icons/StoreIcon";
import { supabase } from "@/supabase/lib/supabaseClient";
import { DashboardWidget, DashboardWidgetContainer, LayoutConfig } from "@sanity/dashboard";
import { Card, Code, Flex, Grid, Text } from "@sanity/ui";
import { request } from "http";
import error from "next/error";
import React, {useCallback, useEffect, useState} from 'react'

async function Custom() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: orderData } = await supabase
        .from('orders')
        .select('total_price, order_details(quantity)')
        .order('order_date', { ascending: false })
        .eq('completed', true)
        .eq('paid', true);

    const { data: graphData } = await supabase
        .from('orders')
        .select('order_date, total_price')
        .eq('paid', true)
        .eq('completed', true)
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('order_date', { ascending: false });

    // console.log(orderData)

    const totalRevenue = orderData?.reduce((acc: any, obj: any) => acc + obj.total_price, 0).toFixed(2);

    const totalQuantity = orderData?.reduce((acc, obj) => {
        const objTotalQuantity = obj.order_details.reduce((objAcc, orderDetail) => objAcc + orderDetail.quantity, 0);
        return acc + objTotalQuantity;
    }, 0);

    // console.log(totalQuantities)

    return (
        <DashboardWidgetContainer>
            <Grid
                columns={[2, 3, 4]}
                gap={[1, 1, 2, 3]}
                padding={4}
            >
                <Card padding={[3, 3, 4]} radius={2} shadow={1}>
                    <Flex
                        justify={'space-between'}
                        align={'center'}
                        paddingBottom={2}
                    >
                        <MoneyIcon />
                        <Text size={4} weight="bold">${totalRevenue}</Text>
                    </Flex>
                    <Text align={'right'}>Total Revenue</Text>
                </Card>
                <Card padding={[3, 3, 4]} radius={2} shadow={1}>
                    <Flex
                        justify={'space-between'}
                        align={'center'}
                        paddingBottom={2}
                    >
                        <Dollars />
                        <Text size={4} weight="bold">{orderData?.length}</Text>
                    </Flex>
                    <Text align={'right'}>Total Sales</Text>
                </Card>
                <Card padding={[3, 3, 4]} radius={2} shadow={1}>
                    <Flex
                        justify={'space-between'}
                        align={'center'}
                        paddingBottom={2}
                    >
                        <StoreIcon />
                        <Text size={4} weight="bold">{totalQuantity}</Text>
                    </Flex>
                    <Text align={'right'}>Products Sold</Text>
                </Card>
            </Grid>
            <Card
                paddingX={4}
                paddingBottom={4}
            >
                <Graph
                    data={graphData}
                />
            </Card>
        </DashboardWidgetContainer>
    );
};

export function customWidget(config: {layout?: LayoutConfig} = {}): DashboardWidget {
    return {
        name: 'custom-widget',
        component: Custom,
        layout: config.layout ?? {width: 'large'},
    }
} 