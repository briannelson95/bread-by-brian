import Session from '@/components/auth/Session';
import './globals.css';
import AppProvider from '@/context/AppContext';
import { Toaster } from 'react-hot-toast';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bread by Brian',
  description: 'Freshly baked to order bread.',
  metadataBase: new URL("https://www.breadbybrian.com/"),
  openGraph: {
    images: '/bread-logo.png'
  }
}

export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Session>
        <body>
          <AppProvider>
            {children}
          </AppProvider>
          <Toaster
            position='bottom-right'
          />
        </body>
      </Session>
    </html>
  )
}
