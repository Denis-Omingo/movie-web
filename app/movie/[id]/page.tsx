// app/movie/[id]/page.tsx

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiDownload, FiShare2 } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { fetchMovieDetails } from '@/lib/fetchMovieDetails';
import VideoPlayerClient from '@/components/VideoPlayerClient';

import '@/app/globals.css';

type Genre = {
  id: number;
  name: string;
};

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) return notFound();

  const movie = await fetchMovieDetails(movieId);
  if (!movie) return notFound();

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-4 py-6">
      <h1 className="text-3xl font-bold text-primary hover:text-foreground transition-colors">
        {movie.title}
      </h1>

      {backdropUrl && (
        <VideoPlayerClient
          backdropUrl={backdropUrl}
          title={movie.title}
          trailerUrl={movie.trailerUrl}
        />
      )}

      <div className="flex gap-4 mt-4 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-muted"
          aria-label="Download"
        >
          <FiDownload /> Download
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-muted"
          aria-label="Share"
        >
          <FiShare2 /> Share
        </Button>
      </div>

      <div className="text-muted-foreground space-y-2">
        <p className="text-base leading-relaxed max-w-3xl">{movie.overview}</p>
        <p className="text-sm">
          <strong>Genres:</strong>{' '}
          {movie.genres?.map((genre: Genre) => genre.name).join(', ') || 'N/A'}
        </p>
        <p className="text-sm">
          <strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)
        </p>
        <p className="text-sm">
          <strong>Release Date:</strong> {movie.release_date}
        </p>
      </div>

      <Link href="/" className="inline-block mt-6">
        <Button variant="link">← Back to Home</Button>
      </Link>
    </div>
  );
}
