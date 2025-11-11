import React from "react";

const AssessmentSkeleton = () => {
  return (
    <div className="w-full pb-20 p-6">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-1/3 bg-gray-800 rounded mb-2 animate-pulse" />
        <div className="h-5 w-1/2 bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Table Container */}
      <div className="bg-[#1a1f2e] rounded-lg shadow-xl overflow-hidden">
        {/* Search Input Skeleton */}
        <div className="px-6 py-4 border-b border-gray-700 relative">
          <div className="relative">
            <div className="h-10 w-1/3 bg-gray-800 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Table Head Skeleton */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-sm text-left divide-y divide-gray-700">
            <thead>
              <tr>
                {Array.from({ length: 10 }).map((_, idx) => (
                  <th key={idx} className="px-4 py-3">
                    <div className="h-5 w-24 bg-gray-800 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table Body Skeleton */}
            <tbody>
              {Array.from({ length: 7 }).map((_, idx) => (
                <tr key={idx}>
                  {Array.from({ length: 10 }).map((_, colIdx) => (
                    <td key={colIdx} className="px-4 py-3">
                      <div className="h-5 w-20 bg-gray-700 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-end px-6 py-4">
          <div className="h-8 w-32 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default AssessmentSkeleton;
