const TransactionSkeleton = () => {
  return (
    <div className="transaction-skeleton">
      {/* Table layout skeleton for large screens */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-[#F7F7F7] border-y text-msm">
              <th className="px-4 py-3 text-left  text-gray-500">Name</th>
              <th className="px-4 py-3 text-left text-gray-500">Date</th>
              <th className="px-4 py-3 text-left text-gray-500">Reference</th>
              <th className="px-4 py-3 text-left text-gray-500">Amount</th>
              <th className="px-4 py-3 text-left text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-gray-500">Narration</th>
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
                  <div className="h-5 bg-gray-200 rounded w-10"></div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-300">
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
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
            className="transaction-card bg-gray-50 p-4 rounded-md flex justify-between items-center animate-pulse"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="bg-gray-50 rounded-full h-2 w-2 animate-pulse"></div>

              <div className="transaction-info space-y-1">
                <div className="h-3 bg-gray-200 rounded w-36"></div>
                <div className="h-2 bg-gray-200 rounded w-14"></div>
              </div>
            </div>

            <div className="transaction-amount text-sm text-right flex flex-col space-y-1">
              <div className="h-3 bg-gray-200 rounded w-32"></div>
              <div className="h-2 bg-gray-200 rounded w-28"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionSkeleton;
