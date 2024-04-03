import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from 'lucide-react'
import { Table, TableHead, TableCell } from '@/components/table'
import { Button } from '@/components/button'

// Create search state
// Pagination

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex w-72 items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5">
          <Search className="size-4 text-emerald-300" />
          <input className="flex-1 bg-transparent text-sm outline-none" />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHead className="w-12">
              <input
                type="checkbox"
                className="form-checkbox rounded border-white/10 bg-black/20 text-orange-400 focus:ring-0"
              />
            </TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Participante</TableHead>
            <TableHead>Data de inscrição</TableHead>
            <TableHead>Data do check-in</TableHead>
            <TableHead className="w-16" />
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={i} className="border-b border-white/10 hover:bg-white/5">
              <TableCell>
                <input
                  type="checkbox"
                  className="form-checkbox rounded border-white/10 bg-black/20 text-orange-400 focus:ring-0"
                />
              </TableCell>
              <TableCell>12803</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">
                    Davi Costa de Melo
                  </span>
                  <span>davicosta01082008@gmail.com</span>
                </div>
              </TableCell>
              <TableCell>7 dias atrás</TableCell>
              <TableCell>3 dias atrás</TableCell>
              <TableCell>
                <Button transparent>
                  <MoreHorizontal className="size-4" />
                </Button>
              </TableCell>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>Mostrando 10 de 228</TableCell>
            <TableCell colSpan={3} className="text-right">
              <div className="inline-flex items-center gap-8">
                Página 1 de 23
                <div className="flex gap-1.5">
                  <Button>
                    <ChevronsLeft className="size-4" />
                  </Button>
                  <Button>
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button>
                    <ChevronRight className="size-4" />
                  </Button>
                  <Button>
                    <ChevronsRight className="size-4" />
                  </Button>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </main>
  )
}
