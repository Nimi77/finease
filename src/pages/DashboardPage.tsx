import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Dashboard/Header";
import Sidebar from "../components/Dashboard/Sidebar";

// Loader Component
const Loader = () => (
  <div className="loader-container flex justify-center items-center h-screen">
    <div className="loader w-12 h-12"></div>
  </div>
);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => setIsLoading(false), 5000);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="dashboard h-screen flex">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="px-8 py-6">
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;