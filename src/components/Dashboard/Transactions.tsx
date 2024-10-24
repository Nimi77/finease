import TransactionSkeleton from "./Skeleton/TransactionS";
import { fetchTransactions, Transaction } from "../../api/transaction";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { useQuery } from "react-query";
import { useState } from "react";

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

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
  const totalPages = meta ? Math.ceil(meta.count / transactionsPerPage) : 1;

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) return <TransactionSkeleton />;
  if (error) return <div>Error fetching transactions</div>;

  return (
    <>
      <div className="transaction-heading">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
      </div>

      {transactions.length === 0 ? (
        <p className="text-sm">No transactions found.</p>
      ) : (
        <>
          {/* Table layout for large screens and above */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-[#F7F7F7] border-b text-sm">
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Narration
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Reference
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Amount (NGN)
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Recipient
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction: Transaction) => (
                  <tr key={transaction.reference} className="border-b">
                    <td className="px-4 py-2 lg:py-4 text-sm text-gray-700">
                      {transaction.narration}
                    </td>
                    <td className="px-4 py-2 lg:py-4 text-sm text-gray-700">
                      {transaction.reference}
                    </td>
                    <td className="px-4 py-2 lg:py-4 text-sm text-gray-500">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span
                        className={`font-medium text-sm ${
                          transaction.status === "completed"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(transaction.amount ?? 0)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {transaction.recipient.account_name} at{" "}
                      {transaction.recipient.bank_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for medium screens and below */}
          <div className="lg:hidden space-y-4">
            {transactions.map((transaction: Transaction) => (
              <div
                key={transaction.reference}
                className="transaction-card bg-white shadow-md p-4 rounded-md flex justify-between items-center"
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
                          ? "text-green-600"
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
                    {" "}
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(transaction.amount ?? 0)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Balance Before:{" "}
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(transaction.balance_before ?? 0)}{" "}
                  </span>
                  <span className="text-sm text-gray-500">
                    Balance After:{" "}
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(transaction.balance_after ?? 0)}{" "}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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
