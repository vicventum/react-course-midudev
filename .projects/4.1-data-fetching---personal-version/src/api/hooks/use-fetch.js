import { useEffect, useState } from 'react'

function useFetch (service) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    async function fetchData ({ signal, ignore } = {}) {
      console.log('entra')
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
    }
    const controller = new AbortController()
    const signal = controller.signal
    let ignore = false

    fetchData({ signal, ignore })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [refresh])

  function handleRefresh () {
    setRefresh(!refresh)
  }

  return { data, isLoading, error, refresh: handleRefresh }
}

export { useFetch }
