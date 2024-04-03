import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pass.in',
  description: 'A participant management application for in-person events.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
