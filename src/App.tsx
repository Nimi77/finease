import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Home from "./components/Dashboard/Main";
import Deposit from "./components/Dashboard/Deposit";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="deposit" element={<Deposit />} />
        </Route>
        <Route path="/logout" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
};

export default App;