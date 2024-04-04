import { getEventAttendees } from '@/api/get-event-attendees'
import { Table, TableHead, TableCell } from './table'
import { formatDistanceToNowStrict } from 'date-fns'
import { Button } from './button'
import { MoreHorizontal } from 'lucide-react'
import { Pagination } from './pagination'

interface AttendeesTableProps {
  search: string
  page: number
}

export async function AttendeesTable({ search, page }: AttendeesTableProps) {
  const { attendees, total } = await getEventAttendees({ search, page })

  if (!attendees.length) {
    return (
      <div className="flex h-80 flex-col items-center justify-center gap-2 rounded-lg border border-white/10 p-6">
        <h2 className="text-xl font-bold">
          {search
            ? 'Nenhum participante encontrado'
            : 'Esse evento não possui participantes'}
        </h2>
        <p className="text-zinc-400">
          {search
            ? 'Tente pesquisar por um termo diferente.'
            : 'Participantes inscritos no evento serão mostrados aqui.'}
        </p>
      </div>
    )
  }

  return (
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
        {attendees.map((attendee) => (
          <tr
            key={attendee.id}
            className="border-b border-white/10 hover:bg-white/5"
          >
            <TableCell>
              <input
                type="checkbox"
                className="form-checkbox rounded border-white/10 bg-black/20 text-orange-400 focus:ring-0"
              />
            </TableCell>
            <TableCell>{attendee.id}</TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-white">
                  {attendee.name}
                </span>
                <span>{attendee.email}</span>
              </div>
            </TableCell>
            <TableCell>
              {formatDistanceToNowStrict(attendee.registeredAt)} atrás
            </TableCell>
            <TableCell>
              {attendee.checkedInAt ? (
                `${formatDistanceToNowStrict(attendee.checkedInAt)} atrás`
              ) : (
                <span className="text-zinc-400">Não fez check-in</span>
              )}
            </TableCell>
            <TableCell>
              <Button transparent>
                <MoreHorizontal className="size-4" />
              </Button>
            </TableCell>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <Pagination {...{ total }} />
      </tfoot>
    </Table>
  )
}
