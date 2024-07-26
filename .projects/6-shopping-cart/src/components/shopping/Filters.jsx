import { useState } from 'react'
import './Filters.css'

export function Filters({ changeFilters }) {
  const [minPrice, setMinPrice] = useState(0)

  function handleChangeMinPrice(e) {
    const range = e.target.value
    // ! Esto huele mal, porque hay **dos fuentes de la verdad**
    setMinPrice(range)
    changeFilters(prevState => ({
      ...prevState,
      minPrice: range,
    }))
  }

  function handleChangeCategory(e) {
    const category = e.target.value
    // ! Esto huele mal, porque estamos pasando la función actualizadora de estado de React a un componente hijo
    changeFilters(prevState => ({
      ...prevState,
      category,
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor='price'>Precio a partir de:</label>
        <input
          type='range'
          id='price'
          min='0'
          max='1000'
          step='10'
          onChange={handleChangeMinPrice}
        />
        <span>${minPrice}</span>
      </div>

      <div>
        <label htmlFor='category'>Categoría</label>
        <select id='category' onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='beauty'>Belleza</option>
          <option value='fragrances'>Fragancias</option>
          <option value='furniture'>Muebles</option>
          <option value='groceries'>Comestibles</option>
        </select>
      </div>
    </section>
  )
}
