import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import VendorProfile from './pages/VendorProfile'
import VendorOnboarding from './pages/VendorOnboarding'
import AnomalyDetection from './pages/AnomalyDetection'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="vendor/:id" element={<VendorProfile />} />
        <Route path="onboarding" element={<VendorOnboarding />} />
        <Route path="anomalies" element={<AnomalyDetection />} />
      </Route>
    </Routes>
  )
}
