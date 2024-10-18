import { useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { CiMoneyCheck1 } from "react-icons/ci";
import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "react-query";
import DashboardSteps from "./Three-Step";

const Home = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

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
 
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="w-full h-40 bg-[#AC7E13] text-white p-4 flex flex-col justify-between rounded-md">
          <div className="heading flex justify-between items-center">
            <div className="bg-[#eeb5318c] p-2 rounded-full">
              <MdAccountBalanceWallet size={20} />
            </div>
            <h3 className="font-semibold">Total Balance</h3>
          </div>
          <div className="flex items-center justify-between gap-10">
            <span className="text-xl">
              {showBalance ? `₦${user?.account?.balance}` : "****"}
            </span>
            <button
              className="p-0 m-0 items-center"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? (
                <BiSolidShow size={20} />
              ) : (
                <BiSolidHide size={20} />
              )}
            </button>
          </div>
        </div>
        <div className="bg-secondary text-white w-full h-40 p-4 flex flex-col justify-between rounded-md">
          <div className="heading flex justify-between items-center">
            <div className="bg-active p-2 rounded-full">
              <CiMoneyCheck1 size={20} />
            </div>
            <h3 className="font-semibold">Total Deposit</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl">
              {showDeposit ? `₦${user?.account?.balance}` : "****"}
            </span>
            <button
              className="p-0 m-0"
              onClick={() => setShowDeposit(!showDeposit)}
            >
              {showDeposit ? (
                <BiSolidShow size={20} />
              ) : (
                <BiSolidHide size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-md border p-4 shadow-md">
        <DashboardSteps />
      </div>
      <div className="transactions">

      </div>
    </div>
  );
};

export default Home;