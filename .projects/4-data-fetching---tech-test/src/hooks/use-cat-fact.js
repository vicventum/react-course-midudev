import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/facts'

export const useCatFact = () => {
  const [fact, setFact] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  async function refreshFact ({ signal, ignore = false } = {}) {
    const fact = await getRandomFact({ signal })

    if (ignore) return null
    setFact(fact)
  }
  // Para recuperar la cita al cargar la página
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    let ignore = false

    async function fetchData () {
      try {
        refreshFact({ signal, ignore })
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

  return { fact, isLoading, error, refreshFact }
}
