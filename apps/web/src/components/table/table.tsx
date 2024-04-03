import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function Table({ className, ...rest }: ComponentProps<'table'>) {
  return (
    <div className="rounded-lg border border-white/10">
      <table className={twMerge('w-full', className)} {...rest} />
    </div>
  )
}
