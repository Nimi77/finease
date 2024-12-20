import { useUserProfile } from "../../store/userStore";
import Skeleton from "react-loading-skeleton";

const Account = () => {
  const { data: user, isLoading, error } = useUserProfile();

  if (error)
    return <div className="text-gray-800 m-auto">Error fetching user data</div>;

  const LoadingSkeleton: React.FC<{ width: number | string }> = ({ width }) => (
    <Skeleton width={width} />
  );

  const renderAccountInfo = (label: string, content: React.ReactNode) => (
    <div className="flex items-start justify-between">
      <span className="font-semibold text-gray-500">{label}</span>
      {isLoading ? (
        <LoadingSkeleton width={200} />
      ) : (
        <span className="text-gray-800">{content}</span>
      )}
    </div>
  );

  return (
    <div className="account-page p-6 my-4 max-w-2xl mx-auto bg-white rounded shadow-md">
      <h2 className="text-base font-medium text-primaryText">
        Account Details
      </h2>
      <div className="account-info my-6 space-y-6 text-sm">
        {renderAccountInfo(
          "Full Name",
          `${user?.first_name} ${user?.last_name}`
        )}
        {renderAccountInfo("Account Number", user?.account?.account_number)}
        {renderAccountInfo("Email", user?.email)}
        {renderAccountInfo("Phone Number", user?.phone_number)}
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
              user?.status === "active" ? "text-green-700" : "text-red-600"
            }`}
          >
            {user?.status}
          </span>
        )}
        {renderAccountInfo("Address", user?.address)}
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
