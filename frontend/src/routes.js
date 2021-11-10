import React from 'react'

const Dashboard = React.lazy(() => import('./views/pages/dashboard/Dashboard'))
const Session = React.lazy(() => import('./views/pages/session/Session'))
const PastSession = React.lazy(() => import('./views/pages/pastsession/PastSession'))
const Settings = React.lazy(() => import('./views/pages/settings/Settings'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/past-session/:sessionId', name: 'Past Session', component: PastSession },
  { path: '/session', name: 'Session', component: Session },
  { path: '/settings', name: 'Settings', component: Settings },
]

export default routes
