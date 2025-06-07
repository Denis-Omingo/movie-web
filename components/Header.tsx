'use client';

import DarkModeSwitch from './DarkModeSwitch';
import DesktopMenu from './Menus/DesktopMenu';
import MobileMenu from './Menus/MobileMenu';
import Logo from './Logo';

export default function Header(){
  return (
    <header className="flex justify-between items-center p-4 max-w-6xl mx-auto">
      <DesktopMenu />
      <MobileMenu />
      <div className="flex items-center gap-4">
        <DarkModeSwitch />
        <Logo/>
      </div>
    </header>
  );
}
