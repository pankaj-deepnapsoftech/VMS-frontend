export const BarGraphsSkeleton = () => {
  return (
    <div className="bg-[#161e3e] border border-gray-800 rounded-xl p-4 w-full md:w-[360px] lg:w-[360px] h-auto shadow-md animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="h-5 w-40 bg-gray-600 rounded"></div> {/* Title */}
        <div className="h-4 w-6 bg-gray-600 rounded"></div> {/* Button */}
      </div>

      {/* Doughnut Chart placeholder */}
      <div className="relative flex justify-center items-center h-[120px] sm:h-[140px] md:h-[150px]">
        <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[150px] md:h-[150px] rounded-full border-8 border-gray-700"></div>
        <div className="absolute flex flex-col items-center">
          <div className="h-6 w-12 bg-gray-600 rounded mb-1"></div>{" "}
          {/* Total value */}
          <div className="h-3 w-16 bg-gray-600 rounded"></div> {/* Label */}
        </div>
      </div>

      {/* Legend placeholders */}
      <div className="grid grid-cols-2 gap-y-2 mt-3">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-2 pl-4 sm:pl-6">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>{" "}
            {/* Color dot */}
            <div className="h-4 w-20 bg-gray-600 rounded"></div>{" "}
            {/* Text bar */}
          </div>
        ))}
      </div>
    </div>
  );
};
