import './App.css'
import { useRef, useState } from 'react'
import { MovieList } from './components/MovieList'
import { useMovies } from './hooks/useMovies'

function App () {
  const { movies } = useMovies()
  // const inputRef = useRef()
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  function handleSubmit (event) {
    event.preventDefault()
    //// Usando una referencia
    // const inputElement = inputRef.current
    // const value = inputElement.value

    // ? Obteniendo los dantos sin usar una referencia
    const { query } = Object.fromEntries(
      new window.FormData(event.target)
    )

    console.log('🚀 ~ handleSubmit ~ query:', query)
  }

  function handleChange (event) {
    const newQuery = event.target.value
    // ? Validando que no comience con espacio vacío antes de setear el estado
    if (newQuery.startsWith(' ')) return null
    setQuery(newQuery)

    // ? Validaciones simples con JavaScript
    if (!newQuery) {
      setError('You must enter the name of a movie')
      return null
    }
    if (newQuery.match(/^\d+$/)) {
      setError('You cannot search for a movie that only contains a numberYou must enter the name of a movie')
      return null
    }
    if (newQuery.length < 3) {
      setError('The movie name must be at least 3 characters')
      return null
    }

    setError(null)
  }

  return (
    <>
      <div>
        <header>
          <h1>Movie Search</h1>
          <form action='' className='form' onSubmit={handleSubmit}>
            <fieldset role='group'>
              <input
                value={query}
                style={{ borderColor: error ? 'tomato' : 'transparent' }}
                name='query'
                type='search'
                placeholder='Star Wars, Blade Runner, The Matrix...'
                onChange={handleChange}
              />
              <button type='submit'>Search</button>
            </fieldset>
          </form>

          {error && <p style={{ color: 'tomato' }}>{error}</p>}
        </header>

        <main>
          <MovieList movies={movies} />
        </main>
      </div>
    </>
  )
}

export default App
