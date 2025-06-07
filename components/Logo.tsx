'use-client'

import Link from "next/link";

export default function Logo() {
  return (
    <Link href='/' className="text-1.5xl md:text-3xl font-semibold tracking-wide select-none bg-foreground flex px-2 py-1 rounded-3xl">
      <span className="text-secondary">S</span>
      <span className="text-primary">treaming</span>
    </Link>
  );
}
