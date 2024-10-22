import { useState } from "react";
import { BiSolidHide, BiSolidShow, BiTransferAlt } from "react-icons/bi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { PiHandDepositDuotone } from "react-icons/pi";
import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "react-query";
import Transactions from "./Transactions";

const Home = () => {
  const [showBalance, setShowBalance] = useState(false);

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
    <div className="space-y-8">
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
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="bg-secondary2 text-white rounded-md border p-4 shadow-md">
          <h3 className="text-[0.92rem] font-semibold">
            Make your first deposit
          </h3>
          <p className="pt-2 pb-5 text-sm leading-6">
            Making your first deposit is a crucial step toward unlocking world
            of opportunities.
          </p>
          <button className="bg-secondary text-sm px-4 py-[6px] rounded hover:bg-[#3C5351] transition-colors duration-500 ease-in-out">
            <div className="flex items-center justify-center gap-2">
              <BiTransferAlt size={20} />
              Deposit
            </div>
          </button>
        </div>
        <div className="bg-secondary text-white rounded-md border p-4 shadow-md">
          <h3 className="text-[0.92rem] font-semibold">Transfer</h3>
          <p className="pt-2 pb-5 text-sm leading-6">
            Seamlessly transfer funds to other accounts within our network.
            Enjoy swift and secure transactions.
          </p>
          <button className="bg-secondary2 text-sm px-4 py-[6px] rounded hover:bg-active transition-colors duration-500 ease-in-out">
            <div className="flex items-center justify-center gap-2">
              <PiHandDepositDuotone size={20} />
              Transfer
            </div>
          </button>
        </div>
      </div>
      <div className="transactions">
        <Transactions />
      </div>
    </div>
  );
};

export default Home;