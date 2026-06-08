import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const routes = [
    { path: '/users', label: 'Users' },
    { path: '/teams', label: 'Teams' },
    { path: '/activities', label: 'Activities' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <img src="/octofitapp-small.png" alt="Octofit Tracker" />
          <div>
            <span>Octofit</span>
            <strong>Tracker</strong>
          </div>
        </div>
        <nav className="nav flex-column gap-2">
          {routes.map((route) => (
            <NavLink key={route.path} className="nav-link" to={route.path}>
              {route.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
