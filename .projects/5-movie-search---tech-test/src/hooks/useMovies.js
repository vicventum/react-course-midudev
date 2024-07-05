import { useState } from 'react'
import mockResponseWithoutMovies from '../mocks/search-no-results.json'
import { searchMovies } from '../services/movies'

function useMovies ({ query }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getMovies = async () => {
    try {
      setIsLoading(true)
      setError(null)
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
