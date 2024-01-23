import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { dashboardTool } from "@sanity/dashboard";
import {schemaTypes} from '@/schemas'
import { customWidget } from './utils/sanity/customWidget';

export default defineConfig({
  name: 'default',
  title: 'Bread by Brian',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    dashboardTool({widgets: [
      customWidget({ layout: { width: "small" } })
    ]}),
    structureTool(), 
    visionTool()
  ],

  schema: {
      types: schemaTypes,
  },
})
