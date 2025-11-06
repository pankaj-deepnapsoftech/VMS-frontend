export const TvmCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-[#161e3e] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out rounded-xl px-4 py-4 shadow-md border border-gray-800 animate-pulse"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-600 rounded-md"></div>
            <div className="h-4 bg-gray-600 rounded w-20"></div>
          </div>
          <div className="h-6 bg-gray-600 rounded w-12 mt-3"></div>
        </div>
      ))}
    </div>
  );
};
