import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  display: 'swap',
  // Font features para mejor legibilidad según Design System
  // cv02, cv03, cv04, cv11
});

export const metadata: Metadata = {
  title: 'Rental Buddy - Sales Presentation',
  description: 'Rental Buddy pitch deck - Febrero 2026',
  generator: 'v0.app',
  icons: {
    icon: [
      '/images/shaka%20favicon.jpeg',
    ],
    apple: '/images/shaka%20favicon.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
