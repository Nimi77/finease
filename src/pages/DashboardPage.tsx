import { Outlet } from "react-router-dom";
import Header from "../components/Dashboard/Header";
import Sidebar from "../components/Dashboard/Sidebar";
import Home from "../components/Dashboard/Main";

const Dashboard = () => {
  return (
    <div className="dashboard h-screen flex">
      <Sidebar />

      <div className="flex-1">
        <Header />
        <main className="px-6 pt-4">
          <Home />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;