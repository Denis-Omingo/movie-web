export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  vote_average: number;
  vote_count: number;
  release_date: string;
};

type VideoResult = {
  key: string;
  site: string;
  type: string;
};

type MovieDetailsWithVideos = MovieDetails & {
  videos?: {
    results: VideoResult[];
  };
};

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY!;

function createURL(path: string, params?: Record<string, string | number>) {
  const url = new URL(`${BASE_URL}/${path}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

export async function fetchFromTMDB<T>(
  path: string,
  params?: Record<string, string | number>
): Promise<T> {
  const url = createURL(path, params);
  const res = await fetch(url, {
    next: { revalidate: 10000 },
  });

  if (!res.ok) {
    throw new Error(`TMDB fetch failed: ${res.status}`);
  }

  return res.json();
}

export async function fetchMovies({
  endpoint,
  page = 1,
  with_genres,
}: {
  endpoint: string;
  page?: number;
  with_genres?: string;
}) {
  const params: Record<string, string | number> = { page };
  if (with_genres !== undefined) {
    params.with_genres = with_genres;
  }

  return fetchFromTMDB(endpoint, params);
}

export async function fetchMovieDetails(id: number): Promise<MovieDetails & { trailerUrl: string | null }> {
  const data = await fetchFromTMDB<MovieDetailsWithVideos>(`movie/${id}`, {
    append_to_response: 'videos,images,credits',
    include_image_language: 'en,null',
  });

  const trailer = data.videos?.results?.find(
    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
  );

  return {
    ...data,
    trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null,
  };
}
