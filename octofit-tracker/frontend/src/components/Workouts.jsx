import ResourceList from './ResourceList.jsx'

function Workouts() {
  return (
    <ResourceList
      endpoint="/api/workouts/"
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