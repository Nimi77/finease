import { BiHome, BiTransferAlt } from "react-icons/bi";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { GrCss3 } from "react-icons/gr";
import { FiX } from "react-icons/fi";
import { useUserProfile } from "../../store/userStore";
import Skeleton from "react-loading-skeleton";

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
  { label: "Home", icon: <BiHome size={19} />, href: "/dashboard" },
  {
    label: "Transactions",
    icon: <BiTransferAlt size={19} />,
    href: "/dashboard/transactions",
  },
  {
    label: "Account",
    icon: <RiAccountCircleLine size={19} />,
    href: "/dashboard/account",
  },
  {
    label: "Settings",
    icon: <CiSettings size={19} />,
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
        className={`flex items-center justify-start py-2  rounded transition-all duration-300
          
        hover:bg-active`}
      >
        <div
          className={`mr-3 rounded-full p-2 ${
            isActive
              ? "text-[#f0b221] bg-active"
              : "text-[#af924f] bg-transparent"
          }`}
        >
          {icon}
        </div>
        <span className={`${isActive ? "text-gray-50" : "text-gray-200"}`}>
          {children}
        </span>
      </div>
    </Link>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ className, onClose }) => {
  const { data: user, isLoading } = useUserProfile();
  const location = useLocation();

  return (
    <aside
      className={`sidebar bg-secondary text-white w-60 h-full fixed top-0 left-0 z-40 py-8 px-6 transiton ease-in-out duration-300 ${className}`}
      role="navigation"
      aria-label="Sidebar navigation"
    >
      <div className="min-h-full flex flex-col">
        <div className="flex items-center justify-between px-1">
          <div
            className="brand-name flex items-center gap-3"
            aria-label="Brand name"
          >
            <span className="brand-logo">
              <GrCss3 size={21} />
            </span>
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
        <nav className="sidebar-nav flex-1 my-6" aria-label="Main navigation">
          <ul className="space-y-2 overflow-hidden text-sm">
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
          <div className="flex items-start justify-center gap-2">
            {isLoading ? (
              <Skeleton circle={true} height={66} width={66} />
            ) : (
              user?.avatar && (
                <img
                  src={user.avatar}
                  alt="user's avatar"
                  className="w-10 h-10 rounded-full shadow-md border border-opacity-5"
                />
              )
            )}
            <div className="flex flex-col justify-center items-start">
              <span className="account-name font-medium text-gray-50 text-sm">
                {user?.first_name} {user?.last_name}
              </span>
              <span className="text-xs text-gray-200">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
