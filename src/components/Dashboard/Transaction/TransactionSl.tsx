const TransactionSkeleton = () => {
  return (
    <div className="transaction-skeleton">
      {/* Table layout skeleton for large screens */}
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
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b animate-pulse">
                <td className="px-4 py-2 lg:py-4 text-sm text-gray-300">
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </td>
                <td className="px-4 py-2 lg:py-4 text-sm text-gray-300">
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                </td>
                <td className="px-4 py-2 lg:py-4 text-sm text-gray-300">
                  <div className="h-5 bg-gray-200 rounded w-14"></div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-300">
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-300">
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-300">
                  <div className="h-5 bg-gray-200 rounded w-36"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout skeleton for medium screens and below */}
      <div className="lg:hidden space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="transaction-card bg-white shadow-md p-4 rounded-md flex justify-between items-center animate-pulse"
          >
            <div className="transaction-info space-y-1">
              <div>
                <div className="h-5 bg-gray-200 rounded w-40 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-14"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-36"></div>
            </div>

            <div className="transaction-amount flex flex-col items-end justify-center space-y-1">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-56"></div>
              <div className="h-4 bg-gray-200 rounded w-52"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionSkeleton;
