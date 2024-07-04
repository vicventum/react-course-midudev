const getRandomFact = async (provider, options) => {
  const { signal = null } = options

  const randomFact = await provider({ signal })

  return randomFact
}

const getCatImage = async (provider, options) => {
  const { words = '', signal = null } = options

  const catImage = await provider({ words, signal })

  return catImage
}

export { getRandomFact, getCatImage }
