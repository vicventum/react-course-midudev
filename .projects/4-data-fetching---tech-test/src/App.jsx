import './App.css'
import { useEffect, useState } from 'react'
import { CAT_ENDPOINT_RANDOM_FACT, CAT_ENDPOINT_IMAGE_URL } from './constants.js'

export default function App () {
  const [fact, setFact] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Para recuperar la cita al cargar la página
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    let ignore = false

    async function fetchData () {
      try {
        const resp = await fetch(CAT_ENDPOINT_RANDOM_FACT, { signal })
        if (!resp.ok) throw new Error('Network response was not ok')

        const { fact } = await resp.json()

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

  // Para obtener la imagen cada vez que tengamos una cita
  useEffect(() => {
    if (!fact) return undefined

    const threeFirstWord = fact.split(' ', 3).join(' ')
    fetch(`${CAT_ENDPOINT_IMAGE_URL}/${threeFirstWord}?fontSize=50&fontColor=white`)
      .then(data => {
        const { url } = data
        setImageUrl(url)
      })
  }, [fact])

  return (
    <main>
      <h1>App de gaticos</h1>
      {isLoading && <p>Loading...</p>}
      {!!error && <p>Error: {error.message}</p>}
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
    </main>
  )
}
