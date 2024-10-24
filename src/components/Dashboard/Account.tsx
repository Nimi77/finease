import { useUserProfile } from "../../store/userStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Account = () => {
  const { data: user, isLoading, error } = useUserProfile();

  if (error) return <div>Error fetching user data</div>;

  const LoadingSkeleton: React.FC<{ width: number | string }> = ({ width }) => (
    <Skeleton width={width} />
  );

  const renderAccountInfo = (label: string, content: React.ReactNode) => (
    <div className="flex justify-between">
      <span className="font-medium text-gray-600">{label}:</span>
      {isLoading ? (
        <LoadingSkeleton width={200} />
      ) : (
        <span className="text-gray-800">{content}</span>
      )}
    </div>
  );

  return (
    <div className="account-page p-6 max-w-2xl mx-auto bg-white rounded-md shadow">
      <h1 className="text-lg font-bold text-textG">Account Details</h1>
      <div className="account-info my-4 space-y-3 text-[0.92rem]">
        {renderAccountInfo("Account Number", user?.account?.account_number)}
        {renderAccountInfo(
          "Full Name",
          `${user?.first_name} ${user?.last_name}`
        )}
        {renderAccountInfo("Email", user?.email)}
        {renderAccountInfo("Phone Number", user?.phone_number)}
        {renderAccountInfo("Address", user?.address)}
        {renderAccountInfo(
          "Date of Birth",
          user?.date_of_birth
            ? new Date(user.date_of_birth).toLocaleDateString()
            : "Not provided"
        )}
        {renderAccountInfo(
          "Status",
          <span
            className={`font-semibold ${
              user?.status === "active" ? "text-green-600" : "text-red-600"
            }`}
          >
            {user?.status}
          </span>
        )}
      </div>
      {isLoading ? (
        <Skeleton circle={true} height={96} width={96} className="mx-auto" />
      ) : (
        user?.avatar && (
          <div>
            <img
              src={user.avatar}
              alt="user's avatar"
              className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-md mx-auto"
            />
          </div>
        )
      )}
    </div>
  );
};

export default Account;
