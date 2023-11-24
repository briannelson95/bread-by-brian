import GridItem from '@/components/GridItem'
import { supabase } from '@/supabase/lib/supabaseClient'
import Image from 'next/image'

export default async function Home() {
  const { data: products } = await supabase.from('products').select()

  return (
    <div className='w-full p-2 mb-16 mx-auto'>
      <section className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6'>
        {products?.map((item) => (
          <GridItem
            key={item.id} 
            menuItem={{
              image: item.image,
              link: item.slug,
              title: item.title,
              id: item.id,
              price: item.price,
              limit: item.limit,
            }}            
          />
        ))}
      </section>
    </div>    
  )
}
