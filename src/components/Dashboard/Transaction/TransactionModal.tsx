import { IoWalletOutline } from "react-icons/io5";

interface TransactionModalProps {
  selectedTransaction: {
    transaction_type: string;
    reference: string;
    narration: string;
    amount: number;
    balance_after: number;
    created_at: string;
  } | null;
  closeModal: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  selectedTransaction,
  closeModal,
}) => {
  if (!selectedTransaction) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-hidden={!selectedTransaction}
    >
      <div className="t-modal bg-white w-11/12 max-w-lg py-6 rounded-lg shadow-md">
        <div className="flex flex-col items-start gap-3 px-5">
          <div className="w-12 h-12 flex items-center justify-center bg-[#ccffd09c] rounded-full">
            <IoWalletOutline
              size={26}
              className="text-green-700"
              aria-hidden="true"
            />
          </div>
          <h2 className="text-lg font-medium">Transaction</h2>
        </div>
        <div className="transaction-modal-details my-4">
          <div>
            <span>Wallet</span>
            <span>{selectedTransaction.transaction_type}</span>
          </div>
          <div>
            <span>Reference ID</span>
            <span>{selectedTransaction.reference}</span>
          </div>
          <div>
            <span>Narration</span>
            <span>{selectedTransaction.narration}</span>
          </div>
          <div>
            <span>Amount</span>
            <span className="text-green-700 font-semibold">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(selectedTransaction.amount ?? 0)}
            </span>
          </div>
          <div>
            <span>Balance after transaction</span>
            <span>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(selectedTransaction.balance_after ?? 0)}
            </span>
          </div>
          <div>
            <span>Date</span>
            <span>
              {new Date(selectedTransaction.created_at).toLocaleString(
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
        <div className="mx-4 flex items-center justify-end gap-4 mt-6">
          <button
            className="bg-red-600 text-white py-1.5 px-5 rounded hover:bg-red-500 ease-in-out duration-200"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
