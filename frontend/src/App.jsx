// import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/RegisterPage'
import { Routes, Route } from 'react-router-dom'
import ProgressBar from './components/onboarding/ProgressBar'
import NotFoundPage from './pages/NotFoundPage'
import Dashboard from './pages/DashboardPage'
import RoadmapPage from './pages/RoadmapPage'
import VaultPage from './pages/VaultPage'
import ProgressPage from './pages/ProgressPage'
import ReviewPage from './pages/ReviewPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <Routes>
      <Route path='/notfound' element={<NotFoundPage/>}></Route>
      <Route path='/onboarding' element={<ProgressBar/>}></Route>
      <Route path='/progress' element={<ProgressPage/>}></Route>
      <Route path='/roadmap' element={<RoadmapPage/>}></Route>
      <Route path='/vault' element={<VaultPage/>}></Route>
      <Route path='/review' element={<ReviewPage/>}></Route>
      <Route path='/settings' element={<SettingsPage/>}></Route>
      <Route path='/' element={<LandingPage />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/signup' element={<SignupPage />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
    </Routes>
  )
}

export default App

