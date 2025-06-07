
const API_KEY = process.env.TMDB_API_KEY;

export async function fetchMoviesBySearch(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
  );

  if (!res.ok) throw new Error('Failed to fetch search results');

  const data = await res.json();
  return data.results;
}
