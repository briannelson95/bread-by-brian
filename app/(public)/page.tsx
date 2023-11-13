import GridItem from '@/components/GridItem'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='w-full p-2 mb-16 mx-auto'>
      <section className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6'>
        <GridItem 
          title='Sourdough bread'
          link='/sourdough-bread'
          image='/bread-image.jpg'
        />
        <GridItem 
          title='Croissants'
          link='/croissants'
          image='/croissant.jpg'
        />
      </section>
    </div>    
  )
}
