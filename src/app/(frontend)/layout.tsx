import React from 'react'
import '../globals.css'
import { Inter, Kumbh_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import { cn } from '@/lib/utils'

const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-kumbh-sans',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata = {
  description: '',
  title: 'Future Tech',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang='en'>
      <body className={cn(kumbhSans.variable, inter.variable, 'antialiased')}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
