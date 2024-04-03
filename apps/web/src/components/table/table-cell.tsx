import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function TableCell({ className, ...rest }: ComponentProps<'td'>) {
  return (
    <td
      className={twMerge('px-4 py-3 text-sm text-zinc-300', className)}
      {...rest}
    />
  )
}
