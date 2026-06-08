import ResourceList from './ResourceList.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  return (
    <ResourceList
      endpoint={usersEndpoint}
      title="Users"
      description="Athlete profiles registered in Octofit Tracker."
      fields={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'teamId', label: 'Team' },
      ]}
    />
  )
}

export default Users