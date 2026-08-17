const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('jwt_token')

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))

    throw new Error(
      errorData.error_msg ||
        errorData.message ||
        `Request failed: ${response.status}`
    )
  }

  return response.json()
}

export default fetchWithAuth
export { fetchWithAuth }