import { DashboardWidget, DashboardWidgetContainer, LayoutConfig } from "@sanity/dashboard";
import { Card, Code } from "@sanity/ui";
import { request } from "http";
import error from "next/error";
import React, {useCallback, useEffect, useState} from 'react'

function Custom() {
    return (
        <DashboardWidgetContainer
            header="Data"     
        >
            <div>
                Hello world
            </div>
        </DashboardWidgetContainer>
    );
};

export function customWidget(config: {layout?: LayoutConfig} = {}): DashboardWidget {
    return {
        name: 'custom-widget',
        component: Custom,
        layout: config.layout ?? {width: 'medium'},
    }
} 