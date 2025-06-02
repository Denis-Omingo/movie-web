'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type NavbarItemProps = {
  title: string
  param: string
}

export default function NavbarItem({ title, param }: NavbarItemProps) {
  const searchParams = useSearchParams()
  const genre = searchParams.get('genre')

  const isActive = genre === param

  return (
    <Link
      href={`/?genre=${param}`}
      className={`font-semibold transition-colors duratio-90 ${
        isActive
          ? 'underline underline-offset-8 decoration-4 decoration-primary text-primary'
          : 'hover:text-primary'
      }`}
    >
      {title}
    </Link>
  )
}
