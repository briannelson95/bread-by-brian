import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'ingredient',
    title: 'Ingredient',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: "wholeNumber",
            title: "Whole Numbers",
            type: "number",
        }),
        defineField({
            name: "fraction",
            title: "Fraction Amount",
            type: "string",
            options: {
                list: ["1/2", "1/3", "1/4", "3/4", "2/3", "1/8"],
            },
        }),
        defineField({
            name: "unit",
            title: "Unit",
            type: "string",
            options: {
                list: ["grams", "mL", "cup", "Tbsp", "tsp", "lbs"],
            },
        })
    ],
})