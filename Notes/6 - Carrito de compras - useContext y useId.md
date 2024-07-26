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

## `useId`

A veces al crear _ids_ puede darse el caso que haya más de un elemento con el mismo _id_ en toda la aplicación (más aún si la aplicación es muy grande), lo cual está mal ya que los _ids_ deberían ser únicos a través de toda la aplicación.

**Filter.jsx**
```jsx
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
        <label
          htmlFor='price' // 👈
        >
          Precio a partir de:
        </label>
        <input
          type='range'
          id='price' // 👈
          min='0'
          max='1000'
          step='10'
          onChange={handleChangeMinPrice}
        />
        <span>${minPrice}</span>
      </div>

      <div>
        <label 
          htmlFor='category' // 👈
        >
          Categoría
        </label>
        <select 
          id='category' // 👈
          onChange={handleChangeCategory}
        >
          <option value='all'>Todas</option>
          <option value='beauty'>Belleza</option>
          <option value='fragrances'>Fragancias</option>
          <option value='furniture'>Muebles</option>
          <option value='groceries'>Comestibles</option>
        </select>
      </div>
    </section>
  )

```

Para ello React tiene el hook `useId`, el cual genera un _id_ que te asegura que siempre será único, y además funciona con _SSR_, y es usado especialmente para _ids_ de elementos de nuestros componentes, por ejemplo en el siguiente caso, para los _ids_ de los labels e inputs:

> [!info]
> Para que el id devuelto por el `useId` siempre sea el mismo, React usa la posición y el orden en el que se está llamando a dicho hook

**Filters.jsx**
```jsx
import { useState, useId } from 'react'
import './Filters.css'

export function Filters({ changeFilters }) {
  const [minPrice, setMinPrice] = useState(0)
  const minPriceFilterId = useId() // 👈
  const categoryFilterId = useId() // 👈

  // ...

  return (
    <section className='filters'>
      <div>
        <label 
          htmlFor={minPriceFilterId} // 👈
        >
          Precio a partir de:
        </label>
        <input
          type='range'
          id={minPriceFilterId} // 👈
          min='0'
          max='1000'
          step='10'
          onChange={handleChangeMinPrice}
        />
        <span>${minPrice}</span>
      </div>

      <div>
        <label 
          htmlFor={categoryFilterId} // 👈
        >
          Categoría
        </label>
        <select 
          id={categoryFilterId}  // 👈
          onChange={handleChangeCategory}
        >
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

