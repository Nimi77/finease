import axiosInstance from "../../api/axiosInstance";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "react-query";
import { RxAvatar } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const fetchUserProfile = async () => {
    const { data } = await axiosInstance.get("/api/v1/profile");
    return data;
  };

  const accessToken = useAuthStore((state) => state.accessToken);
  const {
    data: user,
    isLoading,
    error,
  } = useQuery("userProfile", fetchUserProfile, {
    enabled: !!accessToken,
  });

  return (
    <header className="py-4 px-6 border-b border-gray-200 fixed top-0 lg:left-64 left-0 right-0 z-10 bg-white">
      <div className="nav flex justify-between items-center">
        {/* Hamburger menu icon for mobile */}
        <button className="lg:hidden" onClick={toggleSidebar}>
          <FiMenu size={22} />
        </button>

        {isLoading ? (
          <div className="flex items-center lg:justify-start justify-end gap-4">
            <Skeleton circle width={40} height={40} />
            <Skeleton width={100} height={20} className="ml-4" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-start">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <RxAvatar size={22} />
            </div>
            <p className="ml-4 text-sm text-gray-500">User</p>
          </div>
        ) : (
          <div className="flex flex-row-reverse items-center justify-end gap-4 lg:justify-start lg:flex-row">
            <img
              src={user?.avatar || RxAvatar}
              alt="User's avatar"
              className="w-10 h-10 rounded-full border"
            />
            <div className="flex flex-col">
              <h3 className="font-NotoSans font-medium text-md">
                Hello, {user?.first_name || "Guest"}
              </h3>
              <p className="text-sm hidden lg:block">Welcome to Your Dashboard</p>
            </div>
          </div>
        )}
        <div className="items-center gap-4 hidden lg:flex">
          <button className="relative flex items-center space-x-3">
            <span className="bg-gray-100 p-2 rounded-full">
              <IoMdNotificationsOutline size={20} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;