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

function Navigation() {

    return (
        <>
            <DashboardWidgetContainer>
                <Flex 
                    direction={'column'}
                >
                    <a href="http://localhost:3000/studio/structure/recipe">
                        <Card
                            shadow={1}
                            padding={4}
                        >
                            <Text>Recipes</Text>
                        </Card>
                    </a>
                    <Card
                        shadow={1}
                        padding={4}
                    >
                        <Text>Hello</Text>
                    </Card>
                </Flex>
                
            </DashboardWidgetContainer>
        </>
    );
};

export function NavigationWidget(config: {layout?: LayoutConfig} = {}): DashboardWidget {
    return {
        name: 'navigation-widget',
        component: Navigation,
        layout: config.layout ?? {width: 'small'},
    }
} 