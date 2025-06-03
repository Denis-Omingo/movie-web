'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import { FiPlay, FiMaximize } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

export type VideoPlayerProps = {
  backdropUrl: string;
  title: string;
  trailerUrl: string | null;
};

export default function VideoPlayer({ backdropUrl, title, trailerUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (trailerUrl) setIsPlaying(true);
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      {!isPlaying && (
        <>
          <Image
            src={backdropUrl}
            alt={`${title} backdrop`}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
            onClick={handlePlay}
          >
            <Button size="icon" className="rounded-full text-white bg-black/60 hover:bg-black">
              <FiPlay className="h-8 w-8" />
            </Button>
          </div>
        </>
      )}

      {isPlaying && trailerUrl && (
        <>
          <ReactPlayer
            url={trailerUrl}
            playing
            controls
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
          />
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 flex items-center gap-2 z-10"
            aria-label="Fullscreen"
          >
            <FiMaximize /> Fullscreen
          </Button>
        </>
      )}
    </div>
  );
}
