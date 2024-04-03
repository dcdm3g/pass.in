import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function TableHead({ className, ...rest }: ComponentProps<'th'>) {
  return (
    <th
      className={twMerge(
        'px-4 py-3 text-left text-sm font-semibold',
        className,
      )}
      {...rest}
    />
  )
}
