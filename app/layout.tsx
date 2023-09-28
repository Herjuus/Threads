import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home | Threads',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex justify-center`}>
        <main className='w-full px-1 sm:px-0 mx-2 sm:mx-0 sm:w-11/12 md:w-5/6 lg:w-4/6'>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <Toaster/>
            <Header/>
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
