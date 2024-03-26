import Session from '@/components/auth/Session';
import './globals.css';
import AppProvider from '@/context/AppContext';
import { Toaster } from 'react-hot-toast';
import { Metadata } from 'next';
import { UserContextProvider } from '@/context/UserContext';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

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
      <GoogleTagManager gtmId='GTM-PCWC29VD' />
      <Session>
        <UserContextProvider>
          <body>
            <GoogleAnalytics gaId='G-XGYRK3W6B1' />
            <AppProvider>
              {children}
            </AppProvider>
            <Toaster
              position='bottom-right'
            />
          </body>
        </UserContextProvider>       
      </Session>

    </html>
  )
}
