import { fetchTransactions, Transaction } from "../../../api/transaction";
import TransactionSkeleton from "./TransactionSl";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { useDashboardLayoutContext } from "../Context";
import TransactionModal from "./TransactionModal";

const TransactionHistory = () => {
  const { searchQuery } = useDashboardLayoutContext();
  const [showAll, setShowAll] = useState(false);
  const [limit, setLimit] = useState(12);
  const [transactionResponse, setTransactionResponse] = useState<any>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const { isLoading, error, refetch } = useQuery(
    ["transactions", limit],
    () => fetchTransactions(1, limit),
    {
      onSuccess: (data) => setTransactionResponse(data),
    }
  );

  const transactions = transactionResponse?.transactions || [];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction: Transaction) => {
      const formattedDate = new Date(transaction.created_at).toLocaleString(
        "en-NG",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }
      );
      return (
        transaction.reference
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        formattedDate.includes(searchQuery)
      );
    });
  }, [transactions, searchQuery]);

  const transactionsToShow = filteredTransactions;

  const toggleShowAll = () => {
    if (showAll) {
      setLimit(10);
    } else {
      // Fetch all transactions
      setLimit(transactionResponse.meta.count);
    }
    setShowAll(!showAll);
    refetch();
  };

  const closeModal = () => setSelectedTransaction(null);

  if (isLoading) return <TransactionSkeleton />;
  if (error) return <div>Error fetching transactions</div>;

  return (
    <>
      <div className="heading flex justify-between">
        <h3 className="font-medium mb-4 text-primaryText">
          Transaction History
        </h3>
      </div>
      {transactionsToShow.length === 0 ? (
        <p className="text-sm">No transactions found.</p>
      ) : (
        <>
          {/* Table layout for large screens */}
          <div className="hidden lg:block overflow-x-auto pt-4 pb-6">
            <table className="w-full table-auto border-collapse border border-gray-200 rounded-md">
              <thead>
                <tr className="bg-[#F7F7F7] border-y text-msm">
                  <th className="px-4 py-3 text-left text-gray-500">Name</th>
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
                {transactionsToShow.map((transaction: Transaction) => (
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
                            ? "text-green-700 bg-[#ccffd09c]"
                            : "text-red-700 bg-[#ffc8cd9c]"
                        }`}
                      >
                        {transaction.transaction_type === "deposit"
                          ? "Received"
                          : "Sent"}
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
                className="transaction-card bg-white shadow p-4 rounded-md cursor-pointer"
                onClick={() => setSelectedTransaction(transaction)}
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

                  <div className="transaction-amount text-right flex flex-col space-y-1">
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

          {/* Show More / Show Less button */}
          <div className="flex items-center justify-center">
            <button
              onClick={toggleShowAll}
              className="py-2 px-6 text-sm bg-secondary text-white rounded-md"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default TransactionHistory;
