import { useEffect, useState } from 'react'
import { CAT_ENDPOINT_RANDOM_FACT } from './constants.js'

export default function App () {
  const [fact, setFact] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    let ignore = false

    async function fetchData () {
      try {
        const resp = await fetch(CAT_ENDPOINT_RANDOM_FACT, { signal })
        if (!resp.ok) throw new Error('Network response was not ok')

        const data = await resp.json()
        console.log(data)

        if (ignore) return null
        setFact(data.fact)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error)
        }
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

  return (
    <main>
      <h1>App de gaticos</h1>
      {isLoading && <p>Loading...</p>}
      {!!error && <p>Error: {error.message}</p>}
      {fact && <p>{fact}</p>}
    </main>
  )
}
