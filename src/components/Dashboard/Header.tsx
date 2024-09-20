import { BiSearch } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";

const Header = () => {
  return (
    <header className="p-6">
      <div className="nav flex justify-between items-center">
        <div className="flex items-center justify-start gap-4">
          <img src="" className="w-10 h-10 rounded-full border"></img>
          <div className="flex flex-col">
            <h3 className="font-NotoSans font-medium text-md">
              Hello, Abimbola
            </h3>
            <p className="text-sm">Welcome to Your Dashbaoard</p>
          </div>
        </div>
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
        <button className="relative flex items-center space-x-3">
          <span className="bg-gray-100 p-2 rounded-full">
            <IoMdNotificationsOutline size={20} />
          </span>
        </button>
      </div>
    </header>
  );
};
export default Header;
