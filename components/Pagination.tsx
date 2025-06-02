'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname(); // ← grabs '/top-rated'
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  // Build up to 3 visible page buttons near currentPage
  const pageButtons = () => {
    const pages: number[] = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {currentPage > 1 && (
        <Button variant="outline" onClick={() => goToPage(currentPage - 1)}>
          ← Previous
        </Button>
      )}

      {pageButtons().map((pageNum) => (
        <Button
          key={pageNum}
          variant={pageNum === currentPage ? 'default' : 'outline'}
          onClick={() => goToPage(pageNum)}
          className={cn('w-10 h-10 p-0 text-sm', {
            'bg-primary text-white': pageNum === currentPage,
          })}
        >
          {pageNum}
        </Button>
      ))}

      {currentPage < totalPages && (
        <Button variant="outline" onClick={() => goToPage(currentPage + 1)}>
          Next →
        </Button>
      )}
    </div>
  );
}
