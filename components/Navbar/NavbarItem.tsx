'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavbarItemProps = {
  title: string
  param: string
}

export default function NavbarItem({ title, param }: NavbarItemProps) {
  const pathname = usePathname()
  const isActive = pathname.includes(param)

  return (
    <Link
      href={`/${param}`}
      className={`font-semibold transition-colors duration-100 ${
        isActive
          ? 'underline underline-offset-8 decoration-4 decoration-primary text-primary'
          : 'hover:text-primary'
      }`}
    >
      {title}
    </Link>
  )
}
