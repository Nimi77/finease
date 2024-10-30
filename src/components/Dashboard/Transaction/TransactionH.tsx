import { searchTransaction } from "../../../api/transaction"; 
import Transactions from "./Transactions";
import { useState } from "react";
import { useQuery } from "react-query";

const TransactionPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const currentPage = 1; 

  // Fetching the transactions
  const { data: transactionResponse, isLoading } = useQuery(
    ["transactions", currentPage, searchQuery],
    () => searchTransaction(currentPage, 5, searchQuery), // Adjust per your setup
    {
      keepPreviousData: true,
    }
  );

  // Handle loading state
  if (isLoading) {
    return <p>Loading transactions...</p>;
  }

  return (
    <div className="transactions">
      <div className="transaction-heading">
        <h2 className="text-primaryText font-semibold mb-4">Transaction History</h2>
        {/* Search Input Field */}
        <input
          type="text"
          placeholder="Search by narration or reference..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full lg:w-1/3"
        />
      </div>

      {transactionResponse && transactionResponse.length > 0 ? (
        <Transactions searchQuery={searchQuery} />
      ) : (
        <p>No transactions found for the given search criteria.</p>
      )}
    </div>
  );
};

export default TransactionPage;
