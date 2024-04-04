import { api } from '@/lib/api'

interface GetEventAttendeesParams {
  search: string
  page: number
}

interface GetEventAttendeesResponse {
  attendees: {
    id: number
    name: string
    email: string
    registeredAt: string
    checkedInAt: string | null
  }[]
  total: number
}

export async function getEventAttendees({
  search,
  page,
}: GetEventAttendeesParams): Promise<GetEventAttendeesResponse> {
  const { data } = await api.get<GetEventAttendeesResponse>(
    '/events/12345678-1234-1234-1234-123456789abc/attendees',
    { params: { search, page } },
  )

  return data
}
