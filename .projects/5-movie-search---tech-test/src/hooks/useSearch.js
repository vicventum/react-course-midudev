import { useEffect, useRef, useState } from 'react'

export const useSearch = () => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ query:', { isFirstInput: isFirstInput.current, query })
    // ? Comprueba que el usuario aún no ha usado el input, y por lo tanto, no hacer la validación, y hacerla solamente cuando comience a escribir y modifique el input
    if (isFirstInput.current) {
      isFirstInput.current = query === ''
      return undefined
    }
    console.log('t')
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
