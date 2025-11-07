export const searchSkeletonLoading = () => {
  return (
    <div className="px-6 py-4 border-b border-gray-700 relative">
      <div className="relative">
        {/* Skeleton for search icon */}
        <div className="absolute top-[47%] -translate-y-[50%] left-2 z-10">
          <div className="w-5 h-5 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
        {/* Skeleton for input */}
        <div className="bg-gray-700 animate-pulse py-2 w-1/3 rounded-md ps-7 pe-3 h-10"></div>
      </div>
    </div>
  );
};
