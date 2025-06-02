'use client'

import React from 'react'
import NavbarItem from './NavbarItem'

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-center gap-6 p-2 text-base lg:text-lg bg-foreground text-background transition-colors duration-100">
      <NavbarItem title="Trending" param="fetchTrending" />
      <NavbarItem title="Top Rated" param="fetchTopRated" />
    </nav>
  )
}

export default Navbar
