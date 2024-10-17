import { useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { CiMoneyCheck1 } from "react-icons/ci";
import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const navigate = useNavigate();

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

  const handleDepositClick = () => {
    navigate("/dashboard/deposit");
  };
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="w-full h-40 bg-[#ac7e13] text-white p-4 flex flex-col justify-between rounded-md">
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
        <h3 className="font-semibold">Make your first deposit</h3>
        <p className="pt-2 pb-5 text-sm">
          Making your first deposit is a crucial step toward unlocking a world
          of opportunities. With our seamless and secure process, you can feel
          confident that your funds are in safe hands.{" "}
        </p>
        <button
          onClick={handleDepositClick}
          className="bg-secondary text-white text-sm px-5 py-2 rounded hover:bg-active transition-colors duration-500 ease-in-out "
        >
          Deposit
        </button>
      </div>
    </div>
  );
};

export default Home;
