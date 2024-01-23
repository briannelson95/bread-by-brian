import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
    name: 'recipe',
    title: 'Recipe',
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
                source: 'title',
                maxLength: 96
            },
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: {type: 'category'}}],
        }),
        defineField({
            name: 'ingredients',
            title: 'Ingredients',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    fieldsets: [
                        {name: 'info', title: 'Info', options: {columns: 2}}
                    ],
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            fieldset: 'info',
                        }),
                        defineField({
                            name: 'amount',
                            title: 'Amount',
                            type: 'string',
                            fieldset: 'info',
                        }),
                        defineField({
                            name: 'link',
                            title: 'Link',
                            type: 'slug'
                        })
                    ]
                })
            ]
        }),
        defineField({
            name: 'instructions',
            title: 'Instructions',
            type: 'array',
            of: [
                {type: 'text'}
            ]
        })
    ],
})