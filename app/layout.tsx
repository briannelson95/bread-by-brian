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
      <body>{children}</body>
    </html>
  )
}
