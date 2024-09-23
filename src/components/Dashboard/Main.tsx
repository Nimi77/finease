import { useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const Home = () => {
  const [showBalance, setShowBalance] = useState(false);
  const userBalance = 1200.8;

  return (
    <div className="flex flex-col gap-4">
      <div >
        <h3>Account Balance</h3>
        <div className="flex items-center justify-start gap-4 mt-4">
          <span className="text-xl">{showBalance ? `$${userBalance}` : "****"}</span>
          <button
          className="p-0 m-0 items-center"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <BiSolidHide/> : <BiSolidShow/>}
          </button>
        </div>
      </div>
      <div>
        <h3>Your Card</h3>
      </div>
      <div>
        <h3>Transactions</h3>
      </div>
    </div>
  );
};

export default Home;