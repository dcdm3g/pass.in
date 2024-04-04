import { Search } from '@/components/search'
import { Suspense } from 'react'
import { AttendeesTable } from '@/components/attendees-table'

interface HomeProps {
  searchParams?: {
    search?: string
    page?: string
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const search = searchParams?.search || ''
  const page = Number(searchParams?.page) || 1

  return (
    <main className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <Search />
      </div>

      <Suspense key={search + page}>
        <AttendeesTable {...{ search, page }} />
      </Suspense>
    </main>
  )
}
