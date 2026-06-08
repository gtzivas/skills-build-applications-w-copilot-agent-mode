const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getApiUrl(endpoint) {
  return `${API_BASE_URL}${endpoint}`
}

export function normalizeCollection(response) {
  if (Array.isArray(response)) {
    return response
  }

  const collection = response?.results || response?.data || response?.items || response?.docs
  return Array.isArray(collection) ? collection : []
}