import axiosInstance from "../../api/axiosInstance";
import { BiSearch } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "react-query";
import { RxAvatar } from "react-icons/rx";

const Header = () => {
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

  if (isLoading) return <div>Loading..</div>;
  if (error) return <div>Error fetching user dats</div>;

  return (
    <header className="p-6 border-b border-gray-200">
      <div className="nav flex justify-between items-center">
        {user && (
          <div className="flex items-center justify-start gap-4">
            <img
              src={user.avatar || RxAvatar}
              alt="User's avatar"
              className="w-10 h-10 rounded-full border"
            ></img>
            <div className="flex flex-col">
              <h3 className="font-NotoSans font-medium text-md">
                Hello, {user.first_name}
              </h3>
              <p className="text-sm">Welcome to Your Dashboard</p>
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