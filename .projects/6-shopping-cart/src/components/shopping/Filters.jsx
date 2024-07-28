import './Filters.css'
import { useId } from 'react'
import { useFilters } from '@/hooks/use-filters'

export function Filters() {
  const minPriceFilterId = useId()
  const categoryFilterId = useId()
  const { filters, setFilters } = useFilters()

  function handleChangeMinPrice(e) {
    const range = e.target.value
    setFilters(prevState => ({
      ...prevState,
      minPrice: range,
    }))
  }

  function handleChangeCategory(e) {
    const category = e.target.value
    setFilters(prevState => ({
      ...prevState,
      category,
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          id={minPriceFilterId}
          value={filters.minPrice}
          type='range'
          min='0'
          max='1000'
          step='10'
          onChange={handleChangeMinPrice}
        />
        <span>${filters.minPrice}</span>
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
