import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { fetchTransactions, Transaction } from "../../../api/transaction";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import TransactionSkeleton from "./TransactionSl";
import TransactionModal from "./TransactionModal";
import { useQuery } from "react-query";
import { useState } from "react";

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
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

  const closeModal = () => setSelectedTransaction(null);

  if (isLoading) return <TransactionSkeleton />;
  if (error) return <p>Error fetching transactions</p>;

  return (
    <>
      <div className="heading flex items-center justify-between mb-6">
        <h3 className="font-semibold text-base text-primaryText">
          Recent Transactions
        </h3>
        {/* Pagination */}
        <div className="pagination flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 bg-secondary text-white rounded-full disabled:opacity-50 hover:bg-active"
            aria-label="Previous transactions"
          >
            <RxDoubleArrowLeft aria-hidden="true" />
          </button>
          <span className="text-gray-700 font-semibold text-sm hidden sm:block">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 bg-secondary text-white rounded-full disabled:opacity-50 hover:bg-active"
            aria-label="Next transactions"
          >
            <RxDoubleArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
      {transactions.length === 0 ? (
        <p className="text-gray-800 text-msm">No transactions found.</p>
      ) : (
        <>
          {/* Table layout for large screens and above */}
          <div className="hidden lg:block overflow-x-auto mt-4 rounded-md">
            <table
              className="w-full table-auto border-collapse border border-gray-200"
              aria-label="Transactions table"
            >
              <thead>
                <tr className="bg-[#F7F7F7] border-y text-msm">
                  <th className="px-4 py-3 text-left  text-gray-500">Name</th>
                  <th className="px-4 py-3 text-left text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-gray-500">
                    Reference Id
                  </th>
                  <th className="px-4 py-3 text-left text-gray-500">Amount</th>
                  <th className="px-4 py-3 text-left text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-gray-500">
                    Narration
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction: Transaction) => (
                  <tr key={transaction.id} className="border-t">
                    <td className="px-4 py-2 lg:py-4 text-sm text-gray-800">
                      {transaction.recipient.account_name}
                    </td>
                    <td className="px-4 py-2 lg:py-4 text-sm text-gray-800">
                      {new Date(transaction.created_at).toLocaleString(
                        "en-NG",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </td>
                    <td className="px-4 py-2 lg:py-4 text-sm text-gray-800">
                      {transaction.reference}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(transaction.amount ?? 0)}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span
                        className={`font-medium text-sm px-2 py-0.5 rounded-md ${
                          transaction.transaction_type === "deposit"
                            ? "text-green-700 bg-[#CCFFD09C]"
                            : "text-red-700 bg-[#FFC8CD9C]"
                        }`}
                      >
                        {transaction.transaction_type === "deposit"
                          ? " Received "
                          : " Sent "}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {transaction.narration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for medium screens and below */}
          <div className="lg:hidden space-y-4 mt-4">
            {transactions.map((transaction: Transaction) => (
              <div
                key={transaction.id}
                role="button"
                onClick={() => setSelectedTransaction(transaction)}
                tabIndex={0}
                className="transaction-card bg-white shadow p-4 rounded-md cursor-pointer"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedTransaction(transaction);
                  }
                }}
              >
                <div className="transaction-container">
                  <div className="flex items-center justify-center gap-2">
                    <div className="bg-gray-100 text-green-800 rounded-full p-2">
                      {transaction.transaction_type === "deposit" ? (
                        <IoArrowDown size={18} aria-hidden="true" />
                      ) : (
                        <IoArrowUp size={18} aria-hidden="true" />
                      )}
                    </div>
                    <div className="transaction-info space-y-1">
                      <div className="font-medium text-gray-800">
                        <span>
                          {" "}
                          Transfer
                          {transaction.transaction_type === "deposit"
                            ? " From "
                            : " To "}
                        </span>
                        <span>{transaction.recipient.account_name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          {new Date(transaction.created_at).toLocaleString(
                            "en-NG",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="transaction-amount text-sm text-right flex flex-col space-y-1">
                    <span className="font-medium text-gray-800">
                      {transaction.transaction_type === "deposit"
                        ? " + "
                        : " - "}
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(transaction.amount ?? 0)}
                    </span>
                    <span className="text-gray-500">
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(transaction.balance_after ?? 0)}{" "}
                    </span>
                  </div>
                </div>

                {/* shown on 320px screen size and below */}
                <div className="m-transaction-card">
                  <div className="bg-gray-100 text-green-800 rounded-full p-2">
                    {transaction.transaction_type === "deposit" ? (
                      <IoArrowDown size={18} aria-hidden="true" />
                    ) : (
                      <IoArrowUp size={18} aria-hidden="true" />
                    )}
                  </div>
                  <div className="transaction-info flex flex-col items-start justify-start">
                    <div className="font-medium text-gray-800">
                      <span>
                        {" "}
                        Transfer
                        {transaction.transaction_type === "deposit"
                          ? " From "
                          : " To "}
                      </span>
                      <span>{transaction.recipient.account_name}</span>
                    </div>
                    <span className="text-gray-800 mt-1 mb-2">
                      {transaction.transaction_type === "deposit"
                        ? " + "
                        : " - "}
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(transaction.amount ?? 0)}
                    </span>
                    <span className="text-gray-500">
                      {new Date(transaction.created_at).toLocaleString(
                        "en-NG",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          <TransactionModal
            selectedTransaction={selectedTransaction}
            closeModal={closeModal}
          />
        </>
      )}
    </>
  );
};

export default Transactions;
