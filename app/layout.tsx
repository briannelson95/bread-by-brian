import Session from '@/components/auth/Session';
import './globals.css';
import AppProvider from '@/context/AppContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Bread by Brian',
  description: 'Fresh baked bread.',
}

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
