import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionHistory from "./components/Dashboard/Transaction/TransactionH";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import Deposit from "./components/Dashboard/Deposit";
import Transfer from "./components/Dashboard/Transfer";
import Account from "./components/Dashboard/Account";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/DashboardPage";
import Home from "./components/Dashboard/Home";
import Register from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
          <Route path="transactions" element={<TransactionHistory />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
