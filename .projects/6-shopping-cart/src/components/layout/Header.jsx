import { Filters } from '@/components/shopping/Filters'

export function Header({ changeFilters }) {
  return (
    <header>
      <h1>React Shop 🛒</h1>
      <Filters changeFilters={changeFilters} />
    </header>
  )
}
