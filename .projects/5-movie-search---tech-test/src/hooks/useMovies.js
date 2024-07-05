import mockResponseMovies from '../mocks/search-with-results.json'

function useMovies () {
  const movies = mockResponseMovies.Search

  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster
  }))

  return { movies: mappedMovies }
}

export { useMovies }
