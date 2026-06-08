import ResourceList from './ResourceList.jsx'

function Leaderboard() {
  return (
    <ResourceList
      endpoint="/api/leaderboard/"
      title="Leaderboard"
      description="Current competitive standings by points."
      fields={[
        { key: 'userId', label: 'Athlete' },
        { key: 'points', label: 'Points' },
      ]}
    />
  )
}

export default Leaderboard