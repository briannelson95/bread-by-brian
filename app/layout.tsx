import Session from '@/components/auth/Session';
import './globals.css';

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
        <body>{children}</body>
      </Session>
    </html>
  )
}
