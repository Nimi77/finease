import { fetchTransactions, Transaction } from "../../api/transaction";
import { useUnreadCountStore } from "../../store/unreadCountStore";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useAuthStore } from "../../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { FiX } from "react-icons/fi";
import { useRef, useState } from "react";

export default function Others() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [previousTransactions, setPreviousTransactions] = useState<
    Transaction[]
  >([]);
  const [showAll, setShowAll] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const { unreadCount, setUnreadCount, resetUnreadCount } =
    useUnreadCountStore();

  useQuery(["transactions"], () => fetchTransactions(), {
    refetchInterval: 15000,
    onSuccess: (newData) => {
      const newTransactions = newData.transactions.filter(
        (transaction) =>
          !previousTransactions.some((prev) => prev.id === transaction.id)
      );

      if (newTransactions.length > 0) {
        const currentUnreadCount = unreadCount;
        setUnreadCount(currentUnreadCount + 1);
        setPreviousTransactions((prev) => [...newTransactions, ...prev]);
      }
    },
  });

  const transactionsToShow = showAll
    ? previousTransactions
    : previousTransactions.slice(0, 3);

  const toggleShowAll = () => setShowAll((prev) => !prev);

  const toggleDropdown = (dropdown: "notification" | "others") => {
    if (dropdown === "notification") {
      setIsNotificationOpen((prev) => !prev);
      if (!isNotificationOpen) {
        resetUnreadCount();
      }
    } else {
      setIsOptionsOpen((prev) => !prev);
    }

    const isOpen =
      dropdown === "notification" ? isNotificationOpen : isOptionsOpen;
    if (!isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsNotificationOpen(false);
      setIsOptionsOpen(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const openModal = () => {
    setModalOpen(true);
    setIsOptionsOpen(false);
  };
  const closeModal = () => setModalOpen(false);

  const handleLogOut = () => {
    resetUnreadCount();
    logout();
    navigate("/login");
  };

  return (
    <div className="items-center gap-4 flex justify-center">
      {/* Notification */}
      <button
        onClick={() => toggleDropdown("notification")}
        className="relative bg-gray-100 p-1.5 rounded-full flex items-center space-x-3 hover:bg-gray-200 transition-all duration-200 ease-linear focus:outline-none focus:ring-1 focus:ring-gray-500"
        aria-label="Open notification"
        aria-expanded={isNotificationOpen}
      >
        <IoMdNotificationsOutline
          size={20}
          className="text-gray-600"
          aria-hidden="true"
        />
        {unreadCount > 0 && (
          <div className="bg-red-600 w-4 h-4 flex items-center justify-center absolute top-0 -right-2 rounded-full">
            <span className="text-xs text-white">{unreadCount}</span>
          </div>
        )}
      </button>

      {isNotificationOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-2 right-5 w-max p-4 bg-white rounded-md border shadow-lg"
        >
          <div className="flex justify-between items-center">
            <h4>Alerts</h4>
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="p-1 text-red-600 ring-1 ring-inset ring-gray-300"
              aria-label="Close notification"
            >
              <FiX aria-hidden="true" />
            </button>
          </div>
          <ul className="max-h-60 overflow-y-auto space-y-2 mt-4">
            {transactionsToShow.length > 0 ? (
              transactionsToShow.map((transaction) => (
                <li
                  key={transaction.id}
                  className="py-1 border-t first:border-0"
                >
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.created_at).toLocaleString("en-NG", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                  <span className="text-sm font-medium text-gray-800">
                    You{" "}
                    {transaction.transaction_type === "deposit"
                      ? "received"
                      : "sent"}{" "}
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(transaction.amount)}{" "}
                    {transaction.transaction_type === "deposit" ? "from" : "to"}{" "}
                    {transaction.recipient.account_name}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-800">
                No transactions to display for today.
              </p>
            )}
          </ul>
          {previousTransactions.length > 3 && (
            <button
              onClick={toggleShowAll}
              className="mt-2 text-sm text-gray-800 underline"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}

      {/* more options */}
      <span id="OptionsLabel" className="sr-only">
        Open more options
      </span>
      <button
        onClick={() => toggleDropdown("others")}
        className="bg-gray-100 p-1.5 rounded-full relative flex items-center justify-center hover:bg-gray-200 transition-all duration-200 ease-linear focus:outline-none focus:ring-1 focus:ring-gray-500"
        aria-labelledby="OptionsLabel"
        aria-expanded={isOptionsOpen ? "true" : "false"}
      >
        <span className="text-gray-600">
          <PiDotsThreeOutlineVertical size={18} aria-hidden="true" />
        </span>
      </button>

      {isOptionsOpen && (
        <div
          ref={dropdownRef}
          id="optionDropdown"
          className="absolute top-full py-2 right-5 w-40 bg-white border rounded-md shadow-lg"
          aria-live="polite"
        >
          <ul
            aria-label="More menu options"
            className="text-sm text-gray-800 space-y-4"
          >
            <li className="px-6 hover:text-gray-600">
              <Link to="/dashboard/account">Profile</Link>
            </li>
            <li className="px-6 hover:text-gray-600">
              <Link to="/dashboard/account">Account</Link>
            </li>
            <li
              className="px-6 hover:text-gray-600 cursor-pointer"
              onClick={openModal}
            >
              Verify
            </li>
            <li className="px-6 hover:text-gray-600">
              <Link to="/dashboard">Settings</Link>
            </li>
            <li className="px-6 border-t py-2 cursor-pointer hover:text-gray-600">
              <button onClick={handleLogOut} className="bg-inherit">
                LogOut
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded-lg w-96 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Verified Account Numbers
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>Account 1: 8877941039</li>
              <li>Account 2: 8056436111</li>
              <li>Account 3: 5418079112</li>
            </ul>
            <button
              onClick={closeModal}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-500 ease-in-out duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
