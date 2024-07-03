import { CAT_ENDPOINT_RANDOM_FACT, CAT_ENDPOINT_IMAGE_URL } from '../../constants'
import { fetchClient } from '../clients/fetch-client'

export const getFact = async ({ signal } = {}) => {
  const resp = await fetchClient(CAT_ENDPOINT_RANDOM_FACT, { signal })
  if (!resp.ok) throw new Error('Network response was not ok')
  const data = await resp.json()
  return data
}

export const getImage = async ({ words, signal } = {}) => {
  return fetchClient(`${CAT_ENDPOINT_IMAGE_URL}/${words}?fontSize=50&fontColor=white`, { signal })
    .then(data => data)
}
