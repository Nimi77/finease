import { BiHome, BiLogOut, BiTransferAlt, BiWallet } from "react-icons/bi";
import { RiAccountCircleLine } from "react-icons/ri";
import { SiJellyfin } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar bg-[#1D1D41] text-white w-60 min-h-screen py-4 px-6">
      <div className="sidebar-container min-h-full flex flex-col">
        <div className="brand-name flex items-center gap-2 mt-2 mb-6 px-2">
          <SiJellyfin />
          <span className="text-xl font-semibold leading-8 tracking-tight uppercase">
            Finease
          </span>
        </div>
        <nav className="sidebar-nav flex-1">
          <ul className="space-y-2 overflow-hidden text-[0.9rem]">
            <li>
              <Link to="/dashboard">
                <BiHome size={18} />
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/wallet">
                <BiWallet size={18} />
                My Wallet
              </Link>
            </li>
            <li>
              <Link to="/dashboard/transactions">
                <BiTransferAlt size={18} />
                Transactions
              </Link>
            </li>
            <li>
              <Link to="/dashboard/accounts">
                <RiAccountCircleLine size={18} />
                Accounts
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex-shrink-0 mt-auto">
          <button
            onClick={handleLogOut}
            className="flex items-center justify-start gap-2 w-full text-[0.9rem] tracking-wider focus:outline-none focus:ring"
          >
            <BiLogOut size={18} /> LogOut
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
