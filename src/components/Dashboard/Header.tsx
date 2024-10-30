import { IoMdNotificationsOutline } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import { useUserProfile } from "../../store/userStore";
import { BiSearch } from "react-icons/bi";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { data: user, isLoading } = useUserProfile();

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }

  return (
    <header className="py-4 px-6 border-b border-gray-200 fixed top-0 lg:left-64 left-0 right-0 z-10 bg-primary">
      <div className="nav flex justify-between items-center">
        <button className="lg:hidden" onClick={toggleSidebar}>
          <FiMenu size={22} />
        </button>

        {isLoading ? (
          <div className="flex items-center lg:justify-start justify-end gap-4">
            <Skeleton circle width={40} height={40} />
            <Skeleton width={100} height={20} className="ml-4" />
          </div>
        ) : (
          <div className="flex flex-row-reverse items-center justify-end gap-4 lg:justify-start lg:flex-row">
            <img
              src={user?.avatar || RxAvatar}
              alt="User's avatar"
              className="w-10 h-10 rounded-full border"
            />
            <div className="flex flex-col-reverse">
              <h1 className="text-sm text-gray-600 hidden lg:block">
                Welcome to Your Dashboard
              </h1>
              <span className="font-NotoSans font-medium text-md text-primaryText">
                {`${getGreeting()}, ${user?.first_name || "Guest"}`}
              </span>
            </div>
          </div>
        )}
        <div className="mx-20 search flex flex-grow">
          <div className="w-full relative flex items-center justify-center gap-2">
            <BiSearch size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 text-gray-800 text-sm rounded-full focus:outline-none shadow-md"
            />
          </div>
        </div>
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
