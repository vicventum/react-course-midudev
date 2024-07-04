import './App.css'
import mockResponseMovies from './mocks/search-with-results.json'
import mockSearchNoResults from './mocks/search-no-results.json'

function App () {
  const movies = mockResponseMovies.Search
  const hasMovies = !!movies?.length

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
          {
            hasMovies &&
              <ul>
                {
                movies.map(movie => (
                  <li key={movie.imdbID}>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster} alt={movie.Title} />
                  </li>
                ))
              }
              </ul>
            }
          {
            !hasMovies &&
              <p>No se encontraron películas para esta búsqueda</p>
          }
        </main>
      </div>
    </>
  )
}

export default App
