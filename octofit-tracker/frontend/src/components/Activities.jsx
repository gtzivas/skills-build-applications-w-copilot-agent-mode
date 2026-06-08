import ResourceList from './ResourceList.jsx'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  return (
    <ResourceList
      endpoint={activitiesEndpoint}
      title="Activities"
      description="Recent training sessions from the activity log."
      fields={[
        { key: 'activityType', label: 'Activity' },
        { key: 'durationMinutes', label: 'Minutes' },
        { key: 'userId', label: 'Athlete' },
        { key: 'loggedAt', label: 'Logged' },
      ]}
    />
  )
}

export default Activities