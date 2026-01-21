import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CustomCursor } from '@/components/CustomCursor'
import { BackToTop } from '@/components/BackToTop'

export const metadata: Metadata = {
  title: {
    default: 'Personal Brand | Developer Portfolio',
    template: '%s | Developer Portfolio',
  },
  description: 'Elegant personal brand website showcasing development work, blog posts, and projects',
  keywords: ['developer', 'portfolio', 'web development', 'blog', 'personal brand'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Developer Portfolio',
    title: 'Personal Brand | Developer Portfolio',
    description: 'Elegant personal brand website showcasing development work, blog posts, and projects',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Brand | Developer Portfolio',
    description: 'Elegant personal brand website showcasing development work, blog posts, and projects',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          <CustomCursor />
          <Navigation />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
