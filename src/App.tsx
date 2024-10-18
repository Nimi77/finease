import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Home from "./components/Dashboard/Main";
import Deposit from "./components/Dashboard/Deposit";
import Transfer from "./components/Dashboard/Transfer";
import Account from "./components/Dashboard/Account";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
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
          <Route path="transfer" element={<Transfer />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="/logout" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
};

export default App;