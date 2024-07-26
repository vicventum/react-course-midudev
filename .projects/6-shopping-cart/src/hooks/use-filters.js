import { useState } from 'react'

export function useFilters() {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
  })

  function filterProducts(products) {
    return products.filter(
      product =>
        product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category === filters.category)
    )
  }

  return { filterProducts, setFilters }
}
