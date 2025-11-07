export const PaginationSkeletonLoading = () => {
  return (
    <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
      {/* Skeleton for results summary */}
      <div className="h-4 w-36 bg-gray-700 rounded animate-pulse"></div>
      {/* Skeleton for pagination buttons */}
      <div className="flex items-center space-x-2">
        <div className="h-8 w-20 bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="h-8 w-16 bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="h-8 w-20 bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};
