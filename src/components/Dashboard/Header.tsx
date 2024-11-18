import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useUserProfile } from "../../store/userStore";
import Others from "./Others";
import { HiMenuAlt2 } from "react-icons/hi";

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
          <button aria-label="Open menu" className="md:hidden" onClick={onOpen}>
            <HiMenuAlt2 color="#4B5563" size={25} aria-hidden="true" />
          </button>

          <div className="h-text">
            <h1 className="text-sm text-gray-600 block">
              Welcome to Your Dashboard
            </h1>
            {isLoading ? (
              <div className="w-60 h-5 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <span className="font-medium text-primaryText">
                {`${getGreeting()}, ${user?.first_name || "Guest"}`}
              </span>
            )}
          </div>

          {/* Search Input */}
          <div className="search-container mx-16 hidden lg:flex flex-grow">
            <div className="search-box w-full relative flex items-center justify-center gap-2">
              <span className="absolute left-2 bottom-2 text-gray-500">
                <BiSearch size={18} aria-hidden="true" />
              </span>
              <label htmlFor="searchInput" className="sr-only">
                Search transactions
              </label>
              <input
                type="text"
                id="searchInput"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-8 py-2 shadow bg-gray-50 text-gray-800 placeholder:text-gray-500 text-sm rounded-full focus:outline-none "
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
