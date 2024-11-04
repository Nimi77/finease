import { BiHome, BiTransferAlt } from "react-icons/bi";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { useUserProfile } from "../../store/userStore";
import { motion } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  href: string;
  isActive: boolean;
}

const LinkItems = [
  { label: "Home", icon: <BiHome size={20} />, href: "/dashboard" },
  {
    label: "Transactions",
    icon: <BiTransferAlt size={20} />,
    href: "/dashboard/transactions",
  },
  {
    label: "Account",
    icon: <RiAccountCircleLine size={20} />,
    href: "/dashboard/account",
  },
  {
    label: "Settings",
    icon: <CiSettings size={20} />,
    href: "/dashboard/settings",
  },
];

const NavItem: React.FC<NavItemProps> = ({
  icon,
  children,
  href,
  isActive,
}) => (
  <li>
    <Link to={href}>
      <div
        className={`flex items-center justify-start py-3 px-2 rounded-md text-white hover:bg-active transition-all duration-300
          ${isActive ? "bg-active" : "bg-transparent"}
        `}
      >
        <div className="text-[#f0b221] mr-3">{icon}</div>
        <span>{children}</span>
      </div>
    </Link>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ className, isOpen, onClose }) => {
  const { data: user, isLoading } = useUserProfile();
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? "0%" : "0%" }}
      transition={{ type: "tween", duration: 0.5 }}
      className={`sidebar bg-secondary w-60 h-full fixed top-0 left-0 pt-6 pb-8 px-6 transiton ease-in-out duration-300 ${className}`}
      role="navigation"
      aria-label="Sidebar navigation"
    >
      <div className="min-h-full flex flex-col">
        <div className="flex items-center justify-between px-1">
          <div className="brand-name text-white" aria-label="Brand name">
            <span className="text-2xl font-semibold leading-8">Finease</span>
          </div>
          <button
            onClick={onClose}
            className="close-btn flex items-center md:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <FiX size={22} color="white" />
          </button>
        </div>
        <nav className="sidebar-nav flex-1 my-9" aria-label="Main navigation">
          <ul className="space-y-2 overflow-hidden ">
            {LinkItems.map((link) => (
              <NavItem
                key={link.label}
                icon={link.icon}
                href={link.href}
                isActive={location.pathname === link.href}
              >
                {link.label}
              </NavItem>
            ))}
          </ul>
        </nav>
        <div className="flex-shrink-0 mt-auto">
          {isLoading ? (
            <div className="flex items-center justify-start gap-2">
              <div className="bg-gray-50 rounded-full w-16 h-16 animate-pulse"></div>
              <div className="flex flex-col justify-center items-start gap-2">
                <span className="bg-gray-50 animate-pulse rounded w-24 h-3"></span>
                <span className="bg-gray-50 animate-pulse rounded w-20 h-2"></span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-start gap-2">
              <img
                src={user?.avatar}
                alt="user's avatar"
                className="w-10 h-10 rounded-full shadow-md border border-[#f0b221]"
              />
              <div className="flex flex-col justify-center items-start">
                <span className="account-name font-medium text-gray-100">
                  {user?.first_name} {user?.last_name}
                </span>
                <span className="text-sm text-gray-300">{user?.email}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
