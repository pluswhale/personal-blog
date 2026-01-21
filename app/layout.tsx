import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: {
    default: 'Personal Blog',
    template: '%s | Personal Blog',
  },
  description: 'A personal blog and portfolio showcasing my work and thoughts',
  keywords: ['blog', 'portfolio', 'web development', 'programming'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Personal Blog',
    title: 'Personal Blog',
    description: 'A personal blog and portfolio showcasing my work and thoughts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Blog',
    description: 'A personal blog and portfolio showcasing my work and thoughts',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
