import { createContext, useState } from 'react'

// Paso 1/4 - Crea el contexto que debemos consumir
const FiltersContext = createContext()

// Paso 2/4 - Crea el Provider para proveer el contexto
function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
  })

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}

export { FiltersContext, FiltersProvider }
