import ResourceList from './ResourceList.jsx'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  return (
    <ResourceList
      endpoint={leaderboardEndpoint}
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