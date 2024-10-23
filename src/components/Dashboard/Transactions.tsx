import { fetchTransactions, Transaction } from "../../api/transactionApi";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { useQuery } from "react-query";
import { useState } from "react";

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  // Fetching transactions by passing the current page as a parameter
  const {
    data: transactionResponse,
    isLoading,
    error,
  } = useQuery(
    ["transactions", currentPage],
    () => fetchTransactions(currentPage, transactionsPerPage),
    {
      keepPreviousData: true,
    }
  );

  // extracting transactions and meta from the response
  const transactions = transactionResponse?.transactions || [];
  const meta = transactionResponse?.meta || { count: 0, page: 1, limit: 10 };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching transactions</div>;

  const totalPages = meta ? Math.ceil(meta.count / transactionsPerPage) : 1;

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="transaction-heading">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
      </div>
      <div className="transaction-list space-y-4">
        {transactions.length === 0 ? (
          <p className="text-sm">No transaction found.</p>
        ) : (
          transactions.map((transaction: Transaction) => (
            <div
              key={transaction.reference}
              className="transaction-card bg-white shadow-md p-4 rounded-md flex justify-between items-start"
            >
              <div className="transaction-info space-y-1">
                <div>
                  <span className="medium text-gray-800 text-[0.92rem]">
                    {transaction.narration}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({transaction.reference})
                  </span>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Status: </span>
                  <span
                    className={`font-medium text-sm ${
                      transaction.status === "completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-gray-500">
                    Date:{" "}
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <span>
                    {transaction.transaction_type === "deposit"
                      ? "From: "
                      : "To: "}
                  </span>
                  <span className="font-medium">
                    {transaction.recipient.account_name}
                  </span>
                  <span> at {transaction.recipient.bank_name}</span>
                </div>
              </div>
              <div className="transaction-amount text-right flex flex-col space-y-1">
                <span className="font-semibold text-gray-800">
                  {transaction.amount} NGN
                </span>
                <span className="text-sm text-gray-500 ">
                  Balance Before: {transaction.balance_before} NGN
                </span>
                <span className="text-sm text-gray-500">
                  Balance After: {transaction.balance_after} NGN
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination mt-6 flex justify-center items-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-secondary text-white rounded-md disabled:opacity-50"
        >
          <RxDoubleArrowLeft />
        </button>
        <span className="text-gray-700 font-semibold text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-secondary text-white rounded-md disabled:opacity-50"
        >
          <RxDoubleArrowRight />
        </button>
      </div>
    </>
  );
};

export default Transactions;
