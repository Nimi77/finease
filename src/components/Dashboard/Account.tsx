import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "react-query";

const Account = () => {
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
  if (error) return <div>Error fetching user data</div>;

  // Destructured the user data
  const {
    account_number,
    address,
    avatar,
    date_of_birth,
    email,
    first_name,
    last_name,
    phone_number,
    status,
  } = user;

  return (
    <div className="account-page p-6 max-w-2xl mx-auto bg-white rounded-md shadow">
      <h1 className="text-lg font-bold text-textG">Account Details</h1>
      <div className="account-info my-4 space-y-3 text-[0.92rem]">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Account Number:</span>
          <span className="text-gray-800">{account_number}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Full Name:</span>
          <span className="text-gray-800">
            {first_name} {last_name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="text-gray-800">{email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Phone Number:</span>
          <span className="text-gray-800">{phone_number}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Address:</span>
          <span className="text-gray-800">{address}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Date of Birth:</span>
          <span className="text-gray-800">
            {new Date(date_of_birth).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Status:</span>
          <span
            className={`font-semibold ${
              status === "active" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
      {avatar && (
        <div>
          <img
            src={avatar}
            alt="user's avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-md mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default Account;
