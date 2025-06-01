'use client';

import { useEffect, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { MenuIcon } from 'lucide-react';
import MenuItem from './MenuItem';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export default function MobileMenu() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) return null;

  const handleSelect = () => setIsOpen(false);

  return (
    <div>
      {/* Add aria-describedby here on Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen} aria-describedby="sheet-description">
        <SheetTrigger asChild>
          <button aria-label="Open menu">
            <MenuIcon className="w-6 h-6" />
          </button>
        </SheetTrigger>

        <SheetContent side="left" aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle className="text-lg">Best Shows</SheetTitle>
              <p id="sheet-description" className="sr-only"></p>
          </SheetHeader>

          <div className="ml-3 mt-4 flex flex-col gap-3">
            <MenuItem title="home" address="/" Icon={AiFillHome} onSelect={handleSelect} />
            <MenuItem title="about" address="/about" Icon={BsFillInfoCircleFill} onSelect={handleSelect} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
