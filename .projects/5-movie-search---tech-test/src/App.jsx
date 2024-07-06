import { useState } from 'react'
import './App.css'
import { MovieList } from './components/MovieList'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App () {
  const [isSort, setIsSort] = useState(false)
  const { query, setQuery, error } = useSearch()
  const { movies, isLoading, getMovies } = useMovies({ query, isSort })
  // const inputRef = useRef()

  function handleSubmit (event) {
    event.preventDefault()
    //// Usando una referencia
    // const inputElement = inputRef.current
    // const value = inputElement.value

    // // ? Obteniendo los dantos sin usar una referencia
    // const { query } = Object.fromEntries(
    //   new window.FormData(event.target)
    // )

    getMovies({ query })
  }

  function handleChange (event) {
    setQuery(event.target.value)
  }

  function handleSort () {
    setIsSort(!isSort)
  }

  return (
    <>
      <div>
        <header>
          <h1>Movie Search</h1>
          <form className='form' onSubmit={handleSubmit}>
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
            <label>
              <input type='checkbox' name='sort' checked={isSort} onChange={handleSort} />
              <span>Order by title</span>
            </label>
          </form>

          {error && <p style={{ color: 'tomato' }} className='form-error'>{error}</p>}
        </header>

        <main>
          {isLoading ? <p>Loading...</p> : <MovieList movies={movies} />}
        </main>
      </div>
    </>
  )
}

export default App
