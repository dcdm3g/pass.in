'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { TableCell } from './table'
import { Button } from './button'
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react'

interface PaginationProps {
  total: number
}

export function Pagination({ total }: PaginationProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  function setPage(page: number) {
    const query = new URLSearchParams(searchParams)
    query.set('page', page.toString())

    router.replace(`${pathname}?${query.toString()}`)
  }

  const page = Number(searchParams.get('page')) || 1

  const skipped = 10 * (page - 1)
  const missing = Math.max(total - skipped, 0)
  const showing = Math.min(missing, 10)

  const totalPages = Math.ceil(total / 10)

  return (
    <tr>
      <TableCell colSpan={3}>
        Mostrando {showing} de {total}
      </TableCell>
      <TableCell colSpan={3} className="text-right">
        <div className="inline-flex items-center gap-8">
          Página {page} de {totalPages}
          <div className="flex gap-1.5">
            <Button disabled={page <= 1} onClick={() => setPage(1)}>
              <ChevronsLeft className="size-4" />
            </Button>

            <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="size-4" />
            </Button>

            <Button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>

            <Button
              disabled={page >= totalPages}
              onClick={() => setPage(totalPages)}
            >
              <ChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </TableCell>
    </tr>
  )
}
