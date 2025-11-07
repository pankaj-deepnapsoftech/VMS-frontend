export const TableSkeletonLoading = () => {
  return (
    <div className="overflow-x-auto custom-scrollbar w-full">
      <table className="min-w-full text-sm text-left text-gray-300 divide-y divide-gray-700">
        <thead className="bg-[#0c1120] text-white uppercase whitespace-nowrap tracking-wider">
          <tr>
            {[...Array(10)].map((_, index) => (
              <th
                key={index}
                className="px-4 py-3 border-b border-gray-600 font-medium"
              >
                <div className="h-4 w-20 bg-gray-600 rounded animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {[...Array(5)].map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-[#2d2f32] transition-colors duration-150 whitespace-nowrap"
            >
              {[...Array(10)].map((__, colIndex) => (
                <td key={colIndex} className="px-4 py-3">
                  <div className="h-4 bg-gray-600 rounded w-full max-w-[100px] animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
