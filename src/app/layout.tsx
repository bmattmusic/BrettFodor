// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/navigation'
import { ToastContainer } from '@/components/ToastContainer'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://brettfodor.com'),
  title: 'Brett Fodor',
  description: 'Professional Portfolio and Shop',
  openGraph: {
    title: 'Brett Fodor',
    description: 'Professional Portfolio and Shop',
    url: 'https://brettfodor.com',
    siteName: 'Brett Fodor',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brett Fodor',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brett Fodor',
    description: 'Professional Portfolio and Shop',
    images: ['/og-image.jpg'], // This should be a public URL to your image
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}