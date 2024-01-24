import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { dashboardTool } from "@sanity/dashboard";
import {schemaTypes} from '@/schemas'
import { customWidget } from './utils/sanity/customWidget';
import { documentListWidget } from 'sanity-plugin-dashboard-widget-document-list';
import { NavigationWidget } from './utils/sanity/navigationWidget';

export default defineConfig({
  name: 'default',
  title: 'Bread by Brian',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    dashboardTool(
      {widgets: [
        NavigationWidget(),
        customWidget(),
        NavigationWidget({
          layout: { width: 'small' }
        }),
        NavigationWidget({
          layout: { width: 'small' }
        }),
        NavigationWidget({
          layout: { width: 'small' }
        }),
      ]
    }),
    structureTool(), 
    visionTool()
  ],

  schema: {
      types: schemaTypes,
  },
})
