import { FiMenu } from "react-icons/fi";
import { useUserProfile } from "../../store/userStore";
import { BiSearch } from "react-icons/bi";
import Others from "./Others";

const Header = ({ onOpen }: { onOpen: () => void }) => {
  const { data: user, isLoading } = useUserProfile();

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }

  return (
    <header className="py-4 px-6 fixed top-0 md:left-64 left-0 right-0 z-10 bg-primary">
      <div className="nav flex justify-between items-center">
        <button className="md:hidden" onClick={onOpen}>
          <FiMenu size={22} />
        </button>

        <div className="flex flex-col-reverse items-center justify-end md:justify-start md:items-start">
          <h1 className="text-sm text-gray-600 block">
            Welcome to Your Dashboard
          </h1>
          {isLoading ? (
            <div className="w-60 h-5 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <span className="font-NotoSans font-medium text-md text-primaryText">
              {`${getGreeting()}, ${user?.first_name || "Guest"}`}
            </span>
          )}
        </div>
        <div className="search-container mx-16 hidden lg:flex flex-grow">
          <div className="search-box w-full relative flex items-center justify-center gap-2">
            <span className="absolute left-2 bottom-2 text-gray-400">
              <BiSearch size={18} />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-8 py-2 shadow bg-[#f9fcff] text-gray-800 text-sm rounded-full focus:outline-none "
            />
          </div>
        </div>
        <Others />
      </div>
    </header>
  );
};

export default Header;
