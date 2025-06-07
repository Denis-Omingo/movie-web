'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

export default function MoviesList({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`} className="group">
          <Card className="relative overflow-hidden text-card-foreground transition-transform duration-300 transform group-hover:scale-[1.03] border-none shadow-none cursor-pointer">
          
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || 'Movie poster'}
              width={500}
              height={750}
              className="w-full h-auto"
            />

          
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center">
              <div className="space-y-3 max-w-xs px-2">
                <h3 className="text-lg font-bold text-primary">{movie.title}</h3>
                <p className="text-sm text-white line-clamp-2">{movie.overview}</p>

                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-primary text-primary-foreground hover:text-white flex items-center gap-2 pointer-events-none"
                >
          
                  View Details
                </Button>
              </div>
            </div>

      
            <CardContent className="p-4 backdrop-blur">
              <h4 className="font-semibold text-base text-primary">{movie.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">{movie.overview}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
