import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
  transparent?: boolean
}

export function Button({
  transparent = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      data-transparent={transparent}
      className={twMerge(
        'rounded-md border border-white/10 bg-white/10 p-1.5 disabled:opacity-50 data-[transparent=true]:bg-black/20',
        className,
      )}
      {...rest}
    />
  )
}
