'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Search as SearchIcon } from 'lucide-react'

export function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  function handleSearch(search: string) {
    const query = new URLSearchParams(searchParams)
    query.set('page', '1')

    if (search) {
      query.set('search', search)
    } else {
      query.delete('search')
    }

    router.replace(`${pathname}?${query.toString()}`)
  }

  return (
    <div className="flex w-72 items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5">
      <SearchIcon className="size-4 text-emerald-300" />
      <input
        className="flex-1 bg-transparent text-sm outline-none"
        defaultValue={searchParams.get('search')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
}
