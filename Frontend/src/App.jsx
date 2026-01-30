
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import Login from './components/login'
import Dashboard from './components/admin/Dashboard'

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />

        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
