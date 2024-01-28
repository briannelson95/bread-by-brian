import BannerAd from '@/components/BannerAd';
import GridItem from '@/components/GridItem'
import { supabase } from '@/supabase/lib/supabaseClient'

export const revalidate = 0;

export default async function Home() {
  const { data: products } = await supabase
    .from('products')
    .select()
    .eq('enabled', true)
    .order('order', { ascending: true });

  const { data: promotion }: any = await supabase
    .from('promotions')
    .select()
    .eq('enabled', true)

  const promotionData = promotion[0];

  return (
    <div className='w-full mb-16 mx-auto space-y-4'>
      {promotion?.length ? (
        <BannerAd
          bgColor='pink-500'
          textColor='white'
          title={promotionData.title}
          description={promotionData.description}
          slug={promotionData.slug}
        />
      ) : ''}
      
      <section className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 max-w-4xl mx-auto px-4'>
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
              inventory: item.inventory,
            }}            
          />
        ))}
        <GridItem
          menuItem={{
            image: '/muffins.webp',
            link: '/special-orders',
            title: 'Special Orders',
          }}
        />
      </section>
    </div>    
  )
}
