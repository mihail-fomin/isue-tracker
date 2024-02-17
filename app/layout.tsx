import React from 'react'
import type { Metadata } from 'next'
import './theme-config.css'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './NavBar'
import '@radix-ui/themes/styles.css'
import { Container, Theme } from '@radix-ui/themes'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './auth/Provider'
import QueryClientProvider from './QueryClientProvider'
import NextTopLoader from 'nextjs-toploader'

export const metadata: Metadata = {
  title: 'Issue tracker',
  description: 'Track your issues and close them',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <NextTopLoader height={3} color="purple" easing="cubic-bezier(0.53, 0.21, 0.1)" showSpinner={false} />
        <QueryClientProvider>
          <AuthProvider>
            <Toaster />
            <Theme accentColor="purple">
              <NavBar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
              {/* <ThemePanel /> */}
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
