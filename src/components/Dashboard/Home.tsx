import { BiSolidHide, BiSolidShow, BiTransferAlt } from "react-icons/bi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { PiHandDepositDuotone } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Transactions from "./Transaction/Transactions";
import { useUserProfile } from "../../store/userStore";
import { useState } from "react";

const Home = () => {
  const [showBalance, setShowBalance] = useState(false);
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useUserProfile();

  const handleDepositClick = () => {
    navigate("/dashboard/deposit");
  };
  const handleTransferClick = () => {
    navigate("/dashboard/transfer");
  };

  return (
    <div className="space-y-8">
      {/* first section */}
      <div className="w-full h-40 bg-[#b38418] text-gray-50 p-4 flex flex-col justify-between rounded-md">
        <div className="heading flex justify-between items-center">
          <div className="flex justify-center">
            <div
              className="bg-[#eeb5318c] p-1 rounded-full w-max"
              aria-hidden="true"
            >
              <MdAccountBalanceWallet />
            </div>
            <h2 className="font-semibold text-msm ml-2">Total Balance</h2>
          </div>
          <button
            onClick={handleTransferClick}
            className="text-sm bg-inherit flex justify-center items-center"
          >
            Transaction History{" "}
            <span className="pt-1 pl-2">
              <IoIosArrowForward size={17} />
            </span>
          </button>
        </div>
        <div className="flex items-center justify-between gap-10">
          {isLoading ? (
            <div className="w-20 h-5 bg-gray-50 rounded animate-pulse"></div>
          ) : error ? (
            <span>****</span>
          ) : (
            <span className="text-xl">
              {showBalance
                ? `${new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(user?.account?.balance ?? 0)}`
                : "****"}
            </span>
          )}
          <button
            className="p-0 m-0 items-center"
            onClick={() => setShowBalance(!showBalance)}
            aria-label={showBalance ? "Hide balance" : "Show balance"}
          >
            {showBalance ? (
              <span className="show">
                <BiSolidShow size={20} />
              </span>
            ) : (
              <span className="hide">
                <BiSolidHide size={20} />
              </span>
            )}
          </button>
        </div>
      </div>
      {/* second section */}
      <div className="sec-two">
        <div className="bg-secondary2 flex flex-col items-left justify-center w-full h-[168px] p-4 text-gray-50  rounded-md border shadow">
          <h2 className="text-msm font-semibold">Make your first deposit</h2>
          <p className="pt-2 pb-5 text-sm leading-6">
            Making your first deposit is a crucial step toward unlocking world
            of opportunities.
          </p>
          <button
            onClick={handleDepositClick}
            className="bg-secondary w-fit text-sm px-4 py-[6px] rounded hover:bg-active transition-colors duration-500 ease-in-out"
            aria-label="Deposit funds"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="transfer-icon">
                {" "}
                <BiTransferAlt size={21} />
              </span>
              Deposit
            </div>
          </button>
        </div>

        <div className="bg-secondary flex flex-col items-left justify-center w-full h-[168px] p-4  text-gray-50 rounded-md border shadow">
          <h2 className="text-msm font-semibold">Transfer</h2>
          <p className="pt-2 pb-5 text-sm leading-6">
            Seamlessly transfer funds to other accounts within networks and
            enjoy secure transactions.
          </p>
          <button
            onClick={handleTransferClick}
            className="bg-secondary2 w-fit text-sm px-4 py-[6px] rounded hover:bg-active transition-colors duration-500 ease-in-out"
            aria-label="Transfer funds"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="deposit-icon">
                <PiHandDepositDuotone size={20} />
              </span>
              Transfer
            </div>
          </button>
        </div>
      </div>
      {/* third section */}
      <div className="transactions rounded-md py-4 lg:border border-gray-200">
        <Transactions />
      </div>
    </div>
  );
};

export default Home;
