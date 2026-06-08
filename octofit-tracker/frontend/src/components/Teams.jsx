import ResourceList from './ResourceList.jsx'

function Teams() {
  return (
    <ResourceList
      endpoint="/api/teams/"
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