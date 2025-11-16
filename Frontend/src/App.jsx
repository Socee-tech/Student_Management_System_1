
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './components/admin/Dashboard'
import PlaceholderPage from './components/admin/PlaceholderPage'

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<PlaceholderPage title="Students" />} />
          <Route path="teachers" element={<PlaceholderPage title="Teachers" />} />
          <Route path="classes" element={<PlaceholderPage title="Classes" />} />
          <Route path="attendance" element={<PlaceholderPage title="Attendance" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
