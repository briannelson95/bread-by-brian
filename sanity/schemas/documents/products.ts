import {defineField, defineType} from 'sanity';

export default defineType({
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title'
            }
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number'
        }),
        defineField({
            name: 'maxAmount',
            title: 'Max Amount per Customer',
            type: 'number'
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            fields: [
                {
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string',
                    validation: Rule => Rule.error('You have to fill out the alternative text.').required(),
                }
            ] 
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text'
        })
    ],
})