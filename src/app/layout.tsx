// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/navigation'
import { ToastContainer } from '@/components/ToastContainer'

const inter = Inter({ subsets: ['latin'] })

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