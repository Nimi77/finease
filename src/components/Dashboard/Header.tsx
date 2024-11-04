import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { useUserProfile } from "../../store/userStore";
import Others from "./Others";

const Header = ({
  onOpen,
  setSearchQuery,
}: {
  onOpen: () => void;
  setSearchQuery: (query: string) => void;
}) => {
  const { data: user, isLoading } = useUserProfile();
  const [searchQuery, setLocalSearchQuery] = useState("");

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setLocalSearchQuery(query);
    // Updating the main search query state
    setSearchQuery(query);
  };

  return (
    <header className="px-5 py-4 fixed top-0 left-0 right-0 z-10 bg-primary md:left-60 ">
      <div className="m-auto">
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
              <span className="font-NotoSans font-medium text-primaryText">
                {`${getGreeting()}, ${user?.first_name || "Guest"}`}
              </span>
            )}
          </div>

          {/* Search Input */}
          <div className="search-container mx-16 hidden lg:flex flex-grow">
            <div className="search-box w-full relative flex items-center justify-center gap-2">
              <span className="absolute left-2 bottom-2 text-gray-400">
                <BiSearch size={18} />
              </span>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-8 py-2 shadow bg-gray-50 text-gray-800 text-sm rounded-full focus:outline-none "
              />
            </div>
          </div>

          {/* Notification box and user dropdown */}
          <Others />
        </div>
      </div>
    </header>
  );
};

export default Header;
