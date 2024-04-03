'use client'

import { ComponentProps } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function NavLink({
  href,
  className,
  ...rest
}: ComponentProps<typeof Link>) {
  const pathname = usePathname()

  return (
    <Link
      data-active={pathname === href}
      className={twMerge(
        'text-sm font-medium data-[active=false]:text-zinc-300',
        className,
      )}
      {...{ href, ...rest }}
    />
  )
}
