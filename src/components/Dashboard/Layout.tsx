import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
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

  return (
    <div className="dashboard h-screen flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="px-8 py-6 mt-24 lg:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
