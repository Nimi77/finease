import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onOpen = () => setIsSidebarOpen(true);
  const onClose = () => setIsSidebarOpen(false);

  return (
    <div className="dashboard min-h-screen flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={onClose}
        className="hidden md:block"
      />

      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 left-0">
            <Sidebar isOpen={isSidebarOpen} onClose={onClose} />
          </div>
          <div className="fixed inset-0" onClick={onClose}></div>
        </div>
      )}

      <div className="md:ml-60 flex-1 overflow-auto">
        <Header onOpen={onOpen} />
        <main className="px-8 pt-6 pb-10 mt-[67px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
