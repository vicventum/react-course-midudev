import { useContext } from 'react'
import { FiltersContext } from '@/context/FiltersContext'

export function useFilters() {
  // 4/4 - Usando el contexto
  const { filters, setFilters } = useContext(FiltersContext)

  function filterProducts(products) {
    return products.filter(
      product =>
        product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category === filters.category)
    )
  }

  return { filters, filterProducts, setFilters }
}
