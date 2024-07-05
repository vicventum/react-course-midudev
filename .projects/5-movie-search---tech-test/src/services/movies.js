import { API_MOVIES_URL } from '../../constants'

export async function searchMovies ({ query }) {
  try {
    const response = await fetch(`${API_MOVIES_URL}&s=${query}`)
    const data = await response.json()

    const movies = data.Search

    const mappedMovies = movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
    }))

    return mappedMovies
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
