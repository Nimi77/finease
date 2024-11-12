import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { motion } from "framer-motion";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onOpen = () => setIsSidebarOpen(true);
  const onClose = () => setIsSidebarOpen(false);

  return (
    <div className="dashboard min-h-screen flex">
      <aside className="sidebar bg-secondary w-60 h-full fixed top-0 left-0 pt-6 pb-8 px-6 hidden md:block">
        <Sidebar isOpen={isSidebarOpen} onClose={onClose} />
      </aside>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-40" onClick={onClose}>
          <div className="fixed inset-0 bg-black bg-opacity-35 md:hidden"></div>
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: isSidebarOpen ? "0%" : "-100%" }}
            transition={{ type: "tween", duration: 0.6 }}
            className={`sidebar bg-secondary w-60 h-full fixed top-0 left-0 pt-6 pb-8 px-6 transition ease-in-out duration-300`}
            aria-label="Sidebar navigation"
          >
            <Sidebar isOpen={isSidebarOpen} onClose={onClose} />
          </motion.aside>
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
