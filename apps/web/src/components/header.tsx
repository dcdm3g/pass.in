import Image from 'next/image'
import logo from '@/app/icon.svg'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <header className="flex items-center gap-5 py-2">
      <Image src={logo} alt="logo" />

      <nav className="flex items-center gap-5">
        <NavLink href="/events">Eventos</NavLink>
        <NavLink href="/">Participantes</NavLink>
      </nav>
    </header>
  )
}
