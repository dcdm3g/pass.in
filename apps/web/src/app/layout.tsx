import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ReactNode } from 'react'
import { Header } from '@/components/header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pass.in',
  description: 'A participant management application for in-person events.',
}

setDefaultOptions({ locale: ptBR })

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50`}>
        <div className="mx-auto flex max-w-[1256px] flex-col gap-5 py-5">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
