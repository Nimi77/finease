import { BiHome, BiLogOut, BiTransferAlt, BiWallet } from "react-icons/bi";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { CiSettings } from "react-icons/ci";
import { GrCss3 } from "react-icons/gr";

const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar bg-secondary text-white w-64 min-h-screen py-8 px-6">
      <div className="sidebar-container min-h-full flex flex-col">
        <div className="brand-name flex items-center gap-2 px-2">
          <GrCss3 size={21} />
          <span className="text-2xl font-semibold leading-8">
            Finease
          </span>
        </div>
        <nav className="sidebar-nav flex-1 my-6">
          <ul className="space-y-2 overflow-hidden text-[0.94rem]">
            <li>
              <Link to="/dashboard">
                <BiHome size={18} color="#EEB531" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/wallet">
                <BiWallet size={18} color="#EEB531" />
                My Wallet
              </Link>
            </li>
            <li>
              <Link to="/dashboard/transfer">
                <BiTransferAlt size={18} color="#EEB531" />
                Transactions
              </Link>
            </li>
            <li>
              <Link to="/dashboard/account">
                <RiAccountCircleLine size={18} color="#EEB531" />
                Account
              </Link>
            </li>
            <li>
              <Link to="/dashboard/settings">
                <CiSettings size={18} color="#EEB531" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex-shrink-0 mt-auto">
          <button
            onClick={handleLogOut}
            className="flex items-center justify-start gap-[0.6rem] w-full text-[0.94rem] tracking-wider focus:outline-none focus:ring"
          >
            <BiLogOut size={18} color="#EEB531" /> LogOut
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
