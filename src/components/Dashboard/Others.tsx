import { fetchTransactions, Transaction } from "../../api/transaction";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useAuthStore } from "../../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { FiX } from "react-icons/fi";
import { useRef, useState } from "react";
import { useUnreadCountStore } from "../../store/unreadCountStore";

export default function Others() {
  const [isNotificationOpen, setIsNoticationOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [previousTransactions, setPreviousTransactions] = useState<
    Transaction[]
  >([]);
  const [showAll, setShowAll] = useState(false);
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
        setUnreadCount(unreadCount + newTransactions.length);
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
      setIsNoticationOpen((prev) => !prev);
      resetUnreadCount();
    } else {
      setIsOptionsOpen((prev) => !prev);
    }

    // when any dropdown is opened, event listener added; if closing, removed
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
      setIsNoticationOpen(false);
      setIsOptionsOpen(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="items-center gap-4 flex justify-center">
      {/* Notification  */}
      <span id="notificationLabel" className="sr-only">
        Open Notification
      </span>
      <button
        onClick={() => toggleDropdown("notification")}
        id="notification-btn"
        className="relative bg-gray-100 p-1.5 rounded-full flex items-center space-x-3 hover:bg-gray-200 transition-all duration-200 ease-linear focus:outline-none focus:ring-1 focus:ring-gray-500"
        aria-labelledby="notificationLabel"
        aria-expanded={isNotificationOpen}
      >
        <IoMdNotificationsOutline
          size={20}
          className="not-icon text-gray-600"
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
          id="noificationDropdown"
          className="notifcation-info-card absolute top-full mt-2 right-5 w-max p-4 bg-white rounded-md border shadow-lg"
          aria-live="polite"
        >
          <div className="notification-heading flex justify-between items-center">
            <h4>Alert</h4>
            <button
              onClick={() => setIsNoticationOpen(false)}
              className="p-1 text-red-600 ring-1 ring-inset ring-gray-300"
              aria-label="Close notification"
            >
              <FiX aria-hidden="true" />
            </button>
          </div>
          <div className="notification-text mt-4">
            <ul
              tabIndex={0}
              aria-label="Transactions alert"
              className="max-h-60 overflow-y-auto space-y-2"
            >
              {transactionsToShow.length > 0 ? (
                transactionsToShow.map((transaction) => (
                  <li
                    key={transaction.id}
                    className="flex flex-col items-start justify-center py-1 border-t first:border-0"
                  >
                    <p className="text-gray-500 text-xs">
                      {new Date(transaction.created_at).toLocaleDateString(
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
                    </p>
                    <span className="text-sm font-medium text-gray-800">
                      You just{" "}
                      {transaction.transaction_type === "deposit"
                        ? " received "
                        : " sent "}
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(transaction.amount ?? 0)}
                      {transaction.transaction_type === "deposit"
                        ? " from "
                        : " to "}
                      {transaction.recipient.account_name}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-sm py-1">
                  Alert about your transactions will show here.
                </p>
              )}
            </ul>
            {previousTransactions.length > 3 && (
              <button
                onClick={toggleShowAll}
                className="mt-2 py-1 text-sm text-gray-800 underline"
                aria-label={
                  showAll ? "Show less transactions" : "Show more transactions"
                }
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
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
    </div>
  );
}
