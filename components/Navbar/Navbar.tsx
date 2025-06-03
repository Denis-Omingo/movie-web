'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavbarItem from './NavbarItem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query.trim())}`);

  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-foreground text-background">
      <div className="flex gap-4 text-base lg:text-lg">
        <NavbarItem title="Trending" param="trending" />
        <NavbarItem title="Top Rated" param="top-rated" />
      </div>

     
      <form onSubmit={handleSearch} className="flex items-center gap-2 w-full max-w-sm">
       <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="bg-background text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-transparent"
      />

        <Button type="submit" variant="secondary" size="sm">
          <Search className="w-4 h-4" />
        </Button>
      </form>
    </nav>
  );
};

export default Navbar;
