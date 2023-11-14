import { groq } from "next-sanity";

export const singleProduct = groq`
    *[_type == 'products' && slug.current == $slug][0]
`