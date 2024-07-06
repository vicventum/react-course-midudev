import { useState, useRef } from 'react'
// import mockResponseWithoutMovies from '../mocks/search-no-results.json'
import { searchMovies } from '../services/movies'

function useMovies ({ query }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // ? Se usa una referencia para guardar el estado anterior
  const previousSearch = useRef(query)

  const getMovies = async () => {
    if (query === previousSearch.current) return null
    try {
      setIsLoading(true)
      setError(null)
      previousSearch.current = query
      const newMovies = await searchMovies({ query })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { movies, getMovies, isLoading, error }
}

export { useMovies }
