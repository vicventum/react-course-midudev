import { useEffect, useState } from 'react'

export const useSearch = () => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    // ? Validaciones simples con JavaScript
    // ? Validando que no comience con espacio vacío antes de setear el estado
    if (query.startsWith(' ')) return undefined
    setQuery(query)

    if (!query) {
      setError('You must enter the name of a movie')
      return undefined
    }
    if (query.match(/^\d+$/)) {
      setError('You cannot search for a movie that only contains a numberYou must enter the name of a movie')
      return undefined
    }
    if (query.length < 3) {
      setError('The movie name must be at least 3 characters')
      return undefined
    }

    setError(null)
  }, [query])

  return { query, setQuery, error }
}
