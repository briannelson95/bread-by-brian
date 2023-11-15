import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bread by Brian',
  description: 'Fresh bread baked to order.',
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-4xl p-2 mx-auto`}>
        <Navbar />
        <main className='w-full'>
          {children}
        </main>
      </body>
    </html>
  )
}
