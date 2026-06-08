import ResourceList from './ResourceList.jsx'

function Users() {
  return (
    <ResourceList
      endpoint="/api/users/"
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