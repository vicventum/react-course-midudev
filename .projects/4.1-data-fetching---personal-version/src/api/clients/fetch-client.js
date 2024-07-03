// import { LOCALHOST_URL } from '../../constants'

const fetchClient = async (url, options) => {
  // const URL = `${LOCALHOST_URL}/${url}`
  const headers = {
    'Content-type': 'application/json'
  }

  const response = await fetch(url, { ...options, headers })
  return response
}

export { fetchClient }
