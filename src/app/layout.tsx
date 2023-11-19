import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { AppContextProvider } from '@/context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Controle de Repasses',
  description: 'Controle de Repasses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AppContextProvider>
          <Header />
          {children}  
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  )
}
