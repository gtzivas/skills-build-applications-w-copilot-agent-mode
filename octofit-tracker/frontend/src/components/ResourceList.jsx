import { useEffect, useState } from 'react'

import { normalizeCollection } from '../api.js'

function formatValue(value) {
  if (value == null) {
    return 'Not set'
  }

  if (Array.isArray(value)) {
    return value.map(formatValue).join(', ') || 'None'
  }

  if (value instanceof Date) {
    return value.toLocaleString()
  }

  if (typeof value === 'object') {
    return value.name || value.title || value.email || value._id || JSON.stringify(value)
  }

  return String(value)
}

function ResourceList({ endpoint, title, description, fields }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      try {
        setStatus('loading')
        const response = await fetch(endpoint, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setItems(normalizeCollection(payload))
        setStatus('ready')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadItems()

    return () => controller.abort()
  }, [endpoint])

  return (
    <section className="resource-view">
      <div className="resource-header">
        <div>
          <p className="eyebrow">{endpoint}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <span className="badge text-bg-dark">{items.length} records</span>
      </div>

      {status === 'loading' && <div className="alert alert-secondary">Loading data...</div>}
      {status === 'error' && <div className="alert alert-danger">{error}</div>}

      {status === 'ready' && (
        <div className="resource-grid">
          {items.map((item) => (
            <article className="resource-card" key={item._id || item.id || JSON.stringify(item)}>
              {fields.map((field) => (
                <div className="resource-row" key={field.key}>
                  <span>{field.label}</span>
                  <strong>{formatValue(item[field.key])}</strong>
                </div>
              ))}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ResourceList