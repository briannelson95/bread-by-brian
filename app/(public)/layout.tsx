import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import PublicAlertBanner from '@/components/PublicAlertBanner'
import { supabase } from '@/supabase/lib/supabaseClient'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bread by Brian',
  description: 'Fresh bread baked to order.',
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { data: alert } = await supabase
    .from('alert_banner')
    .select('alert')
    .eq('id', 1)

  return (
    <div className='relative mb-12 md:mb-0'>
      {alert && alert[0].alert !== null && (
        <PublicAlertBanner text={alert[0].alert} visible={alert[0].alert.length > 0} />
      )}
      <div className={`${inter.className}`}>
        <Navbar />
        <main className='w-full'>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}
