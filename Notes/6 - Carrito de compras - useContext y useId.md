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

## `useId` - Ids únicos para elementos

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

## Evitar tener mas de una fuente de la verdad

Esto sucede cuando tenemos el valor de un dato en local, no es el mismo que el que tenemos en nuestro estado global, y por lo tanto, no sabemos de cual fiarnos.

En este caso tenemos dos fuentes de la verdad porque tenemos un `minPrice` de forma local en el componente `Filter`, que es diferente al `minPrice` del estado global del contexto `FiltersContext`, entonces cuando cambia, tenemos que actualizar ambos estados:

**FiltersContext.jsx**
```jsx
import { createContext, useState } from 'react'

// Paso 1/4 - Crea el contexto que debemos consumir
const FiltersContext = createContext()

// Paso 2/4 - Crea el Provider para proveer el contexto
function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0, // 👈
  })

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}

export { FiltersContext, FiltersProvider }
```

**Filters.jsx**
```jsx
import { useState, useId } from 'react'
import './Filters.css'
import { useFilters } from '@/hooks/use-filters'

export function Filters() {
  const [minPrice, setMinPrice] = useState(0) // 👈
  const minPriceFilterId = useId()
  const categoryFilterId = useId()
  const { setFilters } = useFilters()

  function handleChangeMinPrice(e) {
    const range = e.target.value
    // ! Esto huele mal, porque hay **dos fuentes de la verdad**
    setMinPrice(range) // 👈
    setFilters(prevState => ({
      ...prevState,
      minPrice: range, // 👈
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
          value={minPrice} // 👈
          type='range'
          min='0'
          max='1000'
          step='10'
          onChange={handleChangeMinPrice}
        />
        <span>${minPrice}</span> // 👈
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
```

Para corregir esto lo que debemos hacer es sólo fiarnos de una fuente de la verdad, que en este caso sería el estado global. Por lo que simplemente tendríamos que borrar el estado local y usar el estado global:

**Filters.jsx**
```jsx
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
      minPrice: range, // 👈
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
          value={filters.minPrice} // 👈
          type='range'
          min='0'
          max='1000'
          step='10'
          onChange={handleChangeMinPrice}
        />
        <span>${filters.minPrice}</span> // 👈
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
```

## Recomendación al usar el Context con Custom Hooks

Al llamar un Contexto desde un Custom Hook, es una buena práctica **comprobar que lo que devuelve el contexto al llamarlo es diferente a `undefined`, esto porque de serlo, implicaría que esa parte de la aplicación no está envuelta en un _provider_**:

**useCart.jsx**
```jsx
import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'

export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) // 👈
    throw new Error('useCart must be used within a CartProvider') // 👈
    
  // ...
}
```