import { Movie } from './Movie.jsx'

export function MovieList ({ movies }) {
  const hasMovies = !!movies?.length

  return (
    <>
      {
      hasMovies &&
        <ul className='movie-list'>
          {
          movies.map(movie => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.year}
              poster={movie.image}
            />
          ))
        }
        </ul>
      }
      {
      !hasMovies &&
        <p>No se encontraron películas para esta búsqueda</p>
    }
    </>
  )
}
