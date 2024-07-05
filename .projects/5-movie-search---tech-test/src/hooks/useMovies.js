import { useState } from 'react'
import mockResponseMovies from '../mocks/search-with-results.json'
import mockResponseWithoutMovies from '../mocks/search-no-results.json'
import { API_MOVIES_URL } from '../../constants'

function useMovies ({ query }) {
  const [responseMovies, setResponseMovies] = useState([])
  const movies = responseMovies?.Search

  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster
  }))

  const getMovies = async () => {
    if (query) {
      // setResponseMovies(mockResponseMovies)
      const resp = await fetch(`${API_MOVIES_URL}&s=${query}`)
      const data = await resp.json()
      setResponseMovies(data)
    } else {
      setResponseMovies(mockResponseWithoutMovies)
    }
  }

  return { movies: mappedMovies, getMovies }
}

export { useMovies }
