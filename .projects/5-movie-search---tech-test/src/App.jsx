import './App.css'
import { MovieList } from './components/MovieList'
import { useMovies } from './hooks/useMovies'

function App () {
  const { movies } = useMovies()

  return (
    <>
      <div>
        <header>
          <h1>Movie Search</h1>
          <form action='' className='form'>
            <fieldset role='group'>
              <input
                type='search'
                placeholder='Star Wars, Blade Runner, The Matrix...'
              />
              <button type='submit'>Search</button>
            </fieldset>
          </form>
        </header>

        <main>
          <MovieList movies={movies} />
        </main>
      </div>
    </>
  )
}

export default App
