'use client';

import Image from 'next/image';
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
        <Card
          key={movie.id}
          className="relative overflow-hidden text-card-foreground transition-transform duration-300 transform hover:scale-[1.03] border-none shadow-none"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || 'Movie poster'}
            width={500}
            height={750}
            className="w-full h-auto"
          />

        
          <div className="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center px-4">
            <div className="space-y-3 max-w-xs">
              <h3 className="text-lg font-bold text-primary">{movie.title}</h3>
              <p className="text-sm text-white line-clamp-2">{movie.overview}</p>
              <Button
                variant="ghost"
                size="sm"
                className=" bg-primary text-primary-foreground hover:bg-primary"
              >
                View Details
              </Button>
            </div>
          </div>

         
          <CardContent className="p-4  backdrop-blur">
            <h4 className="font-semibold text-base text-primary">{movie.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{movie.overview}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
