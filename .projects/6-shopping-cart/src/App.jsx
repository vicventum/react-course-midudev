import { products as initialProducts } from '@/mocks/products.json'
import { Products } from '@/components/shopping/Products'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useFilters } from '@/hooks/use-filters'

function App() {
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(initialProducts)

  return (
    <>
      <Header />
      <Products products={filteredProducts} />
      <Footer />
    </>
  )
}

export default App
