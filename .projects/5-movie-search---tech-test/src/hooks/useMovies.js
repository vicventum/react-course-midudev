import { useState, useRef, useMemo, useCallback } from 'react'
// import mockResponseWithoutMovies from '../mocks/search-no-results.json'
import { searchMovies } from '../services/movies'

function useMovies ({ query, isSort }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // ? Se usa una referencia para guardar el estado anterior
  const previousSearch = useRef(query)

  // * Usando `useCallback` para que la función sólo se cree una vez, pero acepte por parámetro la nueva query
  const getMovies = useCallback(async ({ query }) => {
    console.log('🚀 ~ getMovies ~ query:', query)
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
  }, [])

  // ? Usamos `useMemo` para que el ordenamiento se realice al cambiar `isSort` y `movies`, pero que NO cuando lo haga `query` (ya que porque ejecutará por completo el hook)
  const sortedMoviesByTitle = useMemo(() => isSort
    // ? `localeCompare` compara dos cadenas de texto sin importar los acentos
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies
  , [isSort, movies])

  return { movies: sortedMoviesByTitle, getMovies, isLoading, error }
}

export { useMovies }
