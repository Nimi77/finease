import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Dashboard/Header";
import Sidebar from "../components/Dashboard/Sidebar";
import Loader from "../components/Dashboard/Loader";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Open by default on large screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024); 
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Open sidebar on large screens, Close sidebar on smaller screens
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false); 
    }
  };
  window.addEventListener("resize", handleResize);

  // Simulating loading state
  setTimeout(() => setIsLoading(false), 5000);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="dashboard h-screen flex bg-primary">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex-1 flex flex-col">
            <Header toggleSidebar={toggleSidebar} />
            <main className="px-8 py-6 overflow-y-auto mt-24">
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;