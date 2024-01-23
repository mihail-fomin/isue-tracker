import React from 'react'
import type { Metadata } from 'next'
import './theme-config.css'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './NavBar'
import '@radix-ui/themes/styles.css'
import { Container, Theme } from '@radix-ui/themes'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme appearance="light" accentColor="purple">
          <NavBar />
          <main className="p-5">
            <Container>
              {children}
            </Container>
          </main>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  )
}
