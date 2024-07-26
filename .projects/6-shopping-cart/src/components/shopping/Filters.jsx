import { useState, useId } from 'react'
import './Filters.css'

export function Filters({ changeFilters }) {
  const [minPrice, setMinPrice] = useState(0)
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

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
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
          step='10'
          onChange={handleChangeMinPrice}
        />
        <span>${minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
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
