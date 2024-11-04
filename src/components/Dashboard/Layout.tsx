import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
        <div className="fixed inset-0 z-40" onClick={onClose}>
          <div className="fixed inset-0 bg-black bg-opacity-35 md:hidden"></div>
          <div>
            <Sidebar isOpen={isSidebarOpen} onClose={onClose} />
          </div>
        </div>
      )}

      <div className="md:ml-60 flex-1 overflow-auto">
        <Header onOpen={onOpen} setSearchQuery={setSearchQuery} />
        <main className="m-auto px-6 py-4 mt-20">
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
