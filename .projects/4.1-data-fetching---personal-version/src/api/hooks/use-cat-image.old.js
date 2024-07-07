import { useEffect, useState } from 'react'
import { CAT_ENDPOINT_IMAGE_URL } from '../../constants'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  // para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')

    fetch(`${CAT_ENDPOINT_IMAGE_URL}/${threeFirstWords}`)
      .then(res => {
        setImageUrl(res.url)
      })
  }, [fact])

  return { imageUrl }
}
