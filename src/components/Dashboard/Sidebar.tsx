import { BiHome, BiLogOut, BiTransferAlt } from "react-icons/bi";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { CiSettings } from "react-icons/ci";
import { GrCss3 } from "react-icons/gr";
import { motion } from "framer-motion";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  // Function to determine if the screen is large or smaller
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      transition={{ type: "tween", duration: 0.6 }}
      className={`sidebar bg-secondary text-white w-64 h-screen fixed top-0 left-0 z-40 py-8 px-6 block lg:relative`}
      role="navigation"
      aria-label="Sidebar navigation"
    >
      <div className="sidebar-container min-h-full flex flex-col">
        <div
          className="brand-name flex items-center gap-2 px-2"
          aria-label="Brand name"
        >
          <GrCss3 size={21} />
          <span className="text-2xl font-semibold leading-8">Finease</span>
        </div>
        <nav className="sidebar-nav flex-1 my-6" aria-label="Main navigation">
          <ul className="space-y-2 overflow-hidden text-[0.94rem]">
            <li>
              <Link to="/dashboard" onClick={handleLinkClick}>
                <BiHome size={18} color="#EEB531" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/transfer" onClick={handleLinkClick}>
                <BiTransferAlt size={18} color="#EEB531" />
                Transactions
              </Link>
            </li>
            <li>
              <Link to="/dashboard/account" onClick={handleLinkClick}>
                <RiAccountCircleLine size={18} color="#EEB531" />
                Account
              </Link>
            </li>
            <li>
              <Link to="/dashboard/settings" onClick={handleLinkClick}>
                <CiSettings size={18} color="#EEB531" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex-shrink-0 mt-auto">
          <button
            onClick={handleLogOut}
            className="w-full text-[0.94rem] tracking-wider focus:outline-none focus:ring-2 focus:ring-yellow-500"
            aria-label="Log out"
          >
            <div className="flex items-center justify-start gap-[0.6rem]">
              <BiLogOut size={18} color="#EEB531" aria-hidden="true" /> LogOut
            </div>
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;