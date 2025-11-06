export const TopFiveRiskIndicatorsSkeleton = () => {
  return (
    <div className="bg-[#161d3d] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out p-4 sm:p-6 rounded-2xl w-full text-white font-sans overflow-x-auto">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold animate-pulse">
          Top 5 Risk Indicators
        </h2>
        <button className="text-white/50 hover:text-white text-lg sm:text-xl leading-none">
          ⋯
        </button>
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((idx) => (
          <div
            key={idx}
            className="bg-[#242f49] rounded-md p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center animate-pulse"
          >
            <div className="mb-2 sm:mb-0 w-full sm:w-auto">
              <div className="h-4 w-32 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 w-20 bg-gray-700 rounded"></div>
            </div>
            <div className="text-right w-full sm:w-auto flex flex-col items-end">
              <div className="h-5 w-16 bg-gray-700 rounded mb-1"></div>
              <div className="h-3 w-20 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
