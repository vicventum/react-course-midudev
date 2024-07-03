import { CAT_ENDPOINT_RANDOM_FACT } from '../constants'

export const getRandomFact = async ({ signal } = {}) => {
  const resp = await fetch(CAT_ENDPOINT_RANDOM_FACT, { signal })
  if (!resp.ok) throw new Error('Network response was not ok')
  const data = await resp.json()
  const { fact } = data
  return fact
}
