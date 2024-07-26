## Creación de filtro en frontend

```jsx
function App() {
  const [products, setProducts] = useState(initialProducts)
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
  })

  function filterProducts(products) { // 👈
    return products.filter(
      product =>
        product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category === filters.category)
    )
  }

	const filteredProducts = filterProducts(products)

  return (
    <>
      <Header />
      <Products products={filteredProducts} />
    </>
  )
}

export default App
```

## Evitar pasar funciones actualizadoras de estado de React como props a componentes hijos

Esto está mal porque los componentes hijos deberían estar abstraidos de lógica de infraestructura, por lo que si se le pasa una función actualizadora de estado de React, el componente hijo tendría que saber el contrato que espera dicha función, cosa que no tendría que hacerlo.

**App.jsx**
```jsx
function App() {
  const [products, setProducts] = useState(initialProducts)
  const [filters, setFilters] = useState({ // 👈
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

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header changeFilters={setFilters} /> // 👈❌
      <Products products={filteredProducts} />
    </>
  )
```

**Header.jsx**
```jsx
import { Filters } from '@/components/shopping/Filters'

export function Header({ changeFilters }) { // 👈❌
  return (
    <header>
      <h1>React Shop 🛒</h1>
      <Filters changeFilters={changeFilters} /> // 👈❌
    </header>
  )
}
```

**Filters.jsx**
```jsx
import { useState } from 'react'
import './Filters.css'

export function Filters({ changeFilters }) { // 👈❌
  const [minPrice, setMinPrice] = useState(0)

  // ...

  function handleChangeCategory(e) {
    const category = e.target.value
		// ! Esto huele mal, porque estamos pasando la función actualizadora de estado de React a un componente hijo
    changeFilters(prevState => ({ // 👈❌
      ...prevState,
      category,
    }))
  }

  return (
    <section className='filters'>
      // ...
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
```

Para ello lo que haremos será crear una abstración