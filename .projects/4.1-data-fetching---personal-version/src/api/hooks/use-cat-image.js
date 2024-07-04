import { useEffect } from 'react'
import { getImage } from '../providers/cat-fetch-provider'
import { getCatImage } from '../services/cat-service'
import { useFetch } from './use-fetch'

function useCatImage ({ fact }) {
  const provider = getImage
  // if (!fact) return null

  const { data, isLoading, error, refresh } = useFetch(({ signal }) => {
    if (!fact) return { data: null, isLoading: true, error: null, refresh: null }

    const threeFirstWord = fact.split(' ', 3).join(' ')
    return getCatImage(provider, { words: threeFirstWord, signal })
  })

  useEffect(() => {
    refresh()
  }, [fact])

  return {
    data: data?.url,
    isLoading,
    isError: !!error,
    error,
    refresh
  }
}

export { useCatImage }

// import { useEffect, useState } from 'react'
// import { CAT_ENDPOINT_IMAGE_URL } from '../../constants'

// export const useCatImage = ({ fact }) => {
//   const [imageUrl, setImageUrl] = useState('')

//   // Para obtener la imagen cada vez que tengamos una cita
//   useEffect(() => {
//     if (!fact) return undefined

//     const threeFirstWord = fact.split(' ', 3).join(' ')
//     fetch(`${CAT_ENDPOINT_IMAGE_URL}/${threeFirstWord}?fontSize=50&fontColor=white`)
//       .then(data => {
//         const { url } = data
//         setImageUrl(url)
//       })
//   }, [fact])

//   return { imageUrl }
// }
