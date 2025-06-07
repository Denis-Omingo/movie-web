import Link from 'next/link';
import type { ElementType } from 'react';

interface MenuItemProps {
  title: string;
  address: string;
  Icon: ElementType;
  onSelect?: () => void; 
}

export default function MenuItem({ title, address, Icon, onSelect }: MenuItemProps) {
  return (
    <Link
      href={address}
      onClick={onSelect}
      className="flex items-center gap-2 hover:text-primary hover:font-medium hover:underline"
    >
      <Icon className="text-1xl sm:hidden" />
      <p className="uppercase sm:inline text-1xl">{title}</p>
    </Link>
  );
}
