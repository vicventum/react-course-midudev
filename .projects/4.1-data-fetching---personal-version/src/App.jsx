import './App.css'
import { useCatImage } from './api/hooks/use-cat-image.js'
import { useCatFact } from './api/hooks/use-cat-fact.js'

export default function App () {
  const { data: fact, isLoading, isError, error, refresh: refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  async function handleClick () {
    refreshFact()
  }

  return (
    <main>
      <h1>App de gaticos</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}

      <button onClick={handleClick}>Get new fact</button>

      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
    </main>
  )
}
