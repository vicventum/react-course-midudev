## Usar frameworks CSS _class less_

Para pruebas técnicas o proyectos muy rápidos en donde no necesitemos concentrarnos en los estilos CSS, pero queramos que nuestro proyecto tenga al menos algunos estilos CSS básicos para dar una buena impresión, podemos usar unos framewors CSS llamados _class less_ (o sin clases), en donde le dan algunos estilos básicos a todo el proyecto y directamente a las etiquetas que usemo.

Entre algunos de ellos están:

- [PicoCSS](https://picocss.com)
- [SimpleCSS](https://simplecss.org)
- [Water.css](https://watercss.kognise.dev)
- [BoltCSS](https://boltcss.com)
- [Sakura](https://oxal.org/projects/sakura/)

## Trabajando con formularios

### Forma _no controlada_

Trabajar de forma _no controlada_ se basa en controlar el formulario a través del DOM, confiando de que el DOM tenga toda la información, **es la forma más sencilla y más óptima**.

#### Usando `useRef`

Para ello, una forma de hacerlo es usando el hook `useRef` para obtener una referencia de cada input del formulario:


```jsx
import './App.css'
import { useRef } from 'react'
import { MovieList } from './components/MovieList'
import { useMovies } from './hooks/useMovies'

function App () {
  const { movies } = useMovies()
  const inputRef = useRef() // 👈

  function handleSubmit(event) {
    event.preventDefault()
    const inputElement = inputRef.current // 👈
    const value = inputElement.value // 👈
    
    console.log(value) // 👈 valor del input
  }

  return (
    <>
      <div>
        <header>
          <h1>Movie Search</h1>
          <form action='' className='form' onSubmit={handleSubmit}> // 👈
            <fieldset role='group'>
              <input
                ref='inputRef' // 👈
                type='search'
                placeholder='Star Wars, Blade Runner, The Matrix...'
              />
              <button type='submit'>Search</button>
            </fieldset>
          </form>
        </header>

        <main>
          <MovieList movies={movies} />
        </main>
      </div>
    </>
  )
}

export default App
```

#### Usando `window.FormData`

Si bien esta forma es la más típica en React, el problema del `useRef` es que si tenemos un formulario demasiado grande, el crear un a referencia para cada input puede ser engorroso.

Por ello una mejor forma es simplemente usar la API del DOM y obtener todos inputs dentro del formulario con `window.FormData` y transformando la data en un objeto con `Object.fromEntries` donde cada input sea un _key_ de ese objeto, de esta forma:

```jsx
import './App.css'
import { useRef } from 'react'
import { MovieList } from './components/MovieList'
import { useMovies } from './hooks/useMovies'

function App () {
  const { movies } = useMovies()

  function handleSubmit(event) {
    event.preventDefault()
    const { query } = Object.fromEntries( // 👈
      new window.FormData(event.target)
    )

    console.log(query) // 👈 valor del input
  }

  return (
    <>
      <div>
        <header>
          <h1>Movie Search</h1>
          <form action='' className='form' onSubmit={handleSubmit}>
            <fieldset role='group'>
              <input
                name='query' // 👈
                type='search'
                placeholder='Star Wars, Blade Runner, The Matrix...'
              />
              <button type='submit'>Search</button>
            </fieldset>
          </form>
        </header>

        <main>
          <MovieList movies={movies} />
        </main>
      </div>
    </>
  )
}

export default App

```
### Forma _controlada_

La forma controlada de manejar formularios, es hacer que React controle el manejo de los inputs (qué se escriben en ellos, cómo validarlos, etc.), para ello haremos uso del `useState` y le pasaremos un estado a cada input, por medio de su atributo `value=""`, escucharemos cuando cambia por medio de su evento `onChange`.

```jsx
import './App.css'
import { useState } from 'react'
import { MovieList } from './components/MovieList'
import { useMovies } from './hooks/useMovies'

function App () {
  const { movies } = useMovies()
  const [query, setQuery] = useState() // 👈

  function handleSubmit (event) {
    event.preventDefault()

    console.log('🚀 ~ handleSubmit ~ query:', query) // 👈
  }

  function handleChange (event) { // 👈
    setQuery(event.target.value) // 👈 valor del input
  }

  return (
    <>
      <div>
        <header>
          <h1>Movie Search</h1>
          <form action='' className='form' onSubmit={handleSubmit}>
            <fieldset role='group'>
              <input
                value={query} // 👈
                name='query'
                type='search'
                placeholder='Star Wars, Blade Runner, The Matrix...'
                onChange={handleChange}
              />
              <button type='submit'>Search</button>
            </fieldset>
          </form>
        </header>

        <main>
          <MovieList movies={movies} />
        </main>
      </div>
    </>
  )
}

export default App

```

Si bien tiene esto tiene sus **ventajas**, como simplificar la **validación de los inputs**, también tiene su **desventajas**, ya que hace que sea **mucho más lento, debido a que cada vez que se actualiza el input disparará un render (aunque esto se puede mitigar con el uso de `useMemo`)**.

## Comprar estado actual con el anterior - Evitando la misma llamada HTTP

### ❌ Forma incorrecta: usando variable fuera de la definición del hook

Una forma de hacerlo que es una mala práctica pero puede funcionar para casos acotados, es **crear un variable tipo _bandera_ fuera de la definición del hook**.

Con ello en este caso podremos guardar el estado en un render, y en el siguiente compararlo con el estado actual:

**useMovies.js**
```js
import { useState, useRef } from 'react'
import { searchMovies } from '../services/movies'

function useMovies ({ query }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  let previousSearch = '' // 👈
  const getMovies = async () => {
    if (query === previousSearch) return null // 👈
    try {
      setIsLoading(true)
      setError(null)
      previousSearch = query // 👈
      const newMovies = await searchMovies({ query })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { movies, getMovies, isLoading, error }
}

export { useMovies }
```

Si bien esto funcionará correctamente, **sólo lo hará mientras usemos ese hook en un sólo sitio, esto porque dicha variable `previousSearch` será compartida cada vez que se invoque dicho hook**, por lo que si llamamos a `useMovies` en otro componente, ya esta solución no funcionará correctamente.

### ✅ Forma correcta: Usando `useRef`

Es por ello que una mejor forma de hacerlo es haciendo uso de un `useRef`, debido a que las referencias no se reinician entre renderizados, podremos guardar el estado en un render, y en el siguiente compararlo con el estado actual:

**useMovies**
```jsx
import { useState, useRef } from 'react'
import { searchMovies } from '../services/movies'

function useMovies ({ query }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // ? Se usa una referencia para guardar el estado anterior
  const previousSearch = useRef(query) // 👈

  const getMovies = async () => {
    if (query === previousSearch.current) return null // 👈
    try {
      setIsLoading(true)
      setError(null)
      previousSearch.current = query // 👈
      const newMovies = await searchMovies({ query })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { movies, getMovies, isLoading, error }
}

export { useMovies }
```

Esto ya no tendrá el problema compartirse entre llamados al hooks en múltiples componentes, ya que el `useRef` se inicializa en cada llamado diferente.