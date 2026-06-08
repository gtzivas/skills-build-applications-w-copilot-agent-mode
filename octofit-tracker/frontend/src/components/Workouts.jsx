import ResourceList from './ResourceList.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  return (
    <ResourceList
      endpoint={workoutsEndpoint}
      title="Workouts"
      description="Recommended workouts matched to activity types."
      fields={[
        { key: 'title', label: 'Workout' },
        { key: 'targetActivityType', label: 'Focus' },
        { key: 'description', label: 'Plan' },
      ]}
    />
  )
}

export default Workouts