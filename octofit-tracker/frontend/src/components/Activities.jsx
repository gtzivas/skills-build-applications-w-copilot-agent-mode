import ResourceList from './ResourceList.jsx'

function Activities() {
  return (
    <ResourceList
      endpoint="/api/activities/"
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