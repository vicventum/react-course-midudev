const getRandomFact = async (provider, options) => {
  const { signal = null } = options

  const randomFact = await provider({ signal })

  return randomFact
}

const getCatImage = async (provider, options) => {
  const { word = '', signal = null } = options

  const catImage = await provider({ word, signal })

  return catImage
}

export { getRandomFact, getCatImage }
