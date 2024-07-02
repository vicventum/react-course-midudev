import './App.css'
import { useEffect, useState } from 'react'
import { getRandomFact } from './services/facts.js'
import { useCatImage } from './hooks/use-cat-image.js'

export default function App () {
  const [fact, setFact] = useState('')
  const { imageUrl } = useCatImage({ fact })

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Para recuperar la cita al cargar la página
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    let ignore = false

    async function fetchData () {
      try {
        const fact = await getRandomFact({ signal })

        if (ignore) return null
        setFact(fact)
      } catch (error) {
        if (error.name !== 'AbortError') setError(error)
      } finally {
        setIsLoading(false)
      }
      return () => {
        ignore = true
        controller.abort()
      }
    }
    fetchData()
  }, [])

  async function handleClick () {
    const newFact = await getRandomFact()
    setFact(newFact)
  }

  return (
    <main>
      <h1>App de gaticos</h1>
      {isLoading && <p>Loading...</p>}
      {!!error && <p>Error: {error.message}</p>}

      <button onClick={handleClick}>Get new fact</button>

      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
    </main>
  )
}
