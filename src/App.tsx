import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './pages/RegisterPage'
import Login from './pages/LoginPage'
import Dashboard from './pages/DashboardPage'

const App: React.FC = () =>{
  return (
   <Router>
      <Routes>
          <Route path="/" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
   </Router>
  )
}

export default App
