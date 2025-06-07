'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen select-none transition-colors duration-300 bg-background text-foreground">
        {children}
      </div>
    </ThemeProvider>
  );
}
