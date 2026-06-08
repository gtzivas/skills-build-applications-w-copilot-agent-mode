import ResourceList from './ResourceList.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  return (
    <ResourceList
      endpoint={teamsEndpoint}
      title="Teams"
      description="Team rosters and training groups."
      fields={[
        { key: 'name', label: 'Team' },
        { key: 'members', label: 'Members' },
      ]}
    />
  )
}

export default Teams