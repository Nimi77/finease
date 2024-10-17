import { Outlet } from "react-router-dom";
import Header from "../components/Dashboard/Header";
import Sidebar from "../components/Dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className="dashboard h-screen flex bg-[#fAFEFE]">
      <Sidebar />

      <div className="flex-1">
        <Header />
        <main className="px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;