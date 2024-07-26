import { useState } from 'react'
import { products as initialProducts } from '@/mocks/products.json'
import { Products } from '@/components/shopping/Products'
import { Header } from '@/components/layout/Header'
import { useFilters } from '@/hooks/use-filters'

function App() {
  const [products] = useState(initialProducts)
  const { filterProducts, setFilters } = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
    </>
  )
}

export default App
