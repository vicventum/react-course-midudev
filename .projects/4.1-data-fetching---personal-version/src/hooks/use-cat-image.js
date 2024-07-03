import { useEffect, useState } from 'react'
import { CAT_ENDPOINT_IMAGE_URL } from '../constants'

export const useCatImage = ({ fact }) => {
  const [imageUrl, setImageUrl] = useState('')

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

  return { imageUrl }
}
