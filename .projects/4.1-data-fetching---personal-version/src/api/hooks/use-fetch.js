import { useEffect, useState } from 'react'

function useFetch (service) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const controller = new AbortController()
  const signal = controller.signal
  let ignore = false

  async function fetchData () {
    try {
      const data = await service({ signal })
      if (ignore) return null
      setData(data)
      setError(null)
    } catch (error) {
      setData(null)
      if (error.name !== 'AbortError') setError(error)
    } finally {
      setIsLoading(false)
    }
    return () => {
      ignore = true
      controller.abort()
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return { data, isLoading, error, refresh: fetchData }
}

export { useFetch }
