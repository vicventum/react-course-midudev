import { getFact } from '../providers/cat-fetch-provider'
import { getRandomFact } from '../services/cat-service'
import { useFetch } from './use-fetch'

function useCatFact () {
  const provider = getFact

  const { data, isLoading, error, refresh } = useFetch(({ signal }) => {
    return getRandomFact(provider, { signal })
  })

  return {
    data: data?.fact,
    isLoading,
    isError: !!error,
    error,
    refresh
  }
}

export { useCatFact }
