
export async function fetchMovies({
  endpoint,
  page = 1,
  with_genres,
}: {
  endpoint: string;
  page?: number;
  with_genres?: string | number;
}) {
  const url = new URL(`https://api.themoviedb.org/3/${endpoint}`);
  url.searchParams.set('language', 'en-US');
  url.searchParams.set('page', page.toString());
  url.searchParams.set('api_key', process.env.TMDB_API_KEY!);

  if (with_genres !== undefined) {
    url.searchParams.set('with_genres', String(with_genres));
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 10000 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  return res.json();
}
