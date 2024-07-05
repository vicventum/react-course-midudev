export function Movie ({ id, title, year, poster }) {
  return (
    <li className='movie'>
      <h3>{title}</h3>
      <p>{year}</p>
      <img src={poster} alt={title} />
    </li>
  )
}
