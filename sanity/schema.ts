import { type SchemaTypeDefinition } from 'sanity'
import products from './schemas/documents/products'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    products,
  ],
}
