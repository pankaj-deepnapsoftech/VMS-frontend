export const LineChartsSkeleton = () => {
  return (
    <div className="bg-[#161e3e] rounded-xl p-4 w-full md:w-[540px] lg:flex-1 text-white shadow-lg border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-40 bg-gray-600 rounded"></div>{" "}
        {/* Title placeholder */}
        <div className="h-5 w-8 bg-gray-600 rounded"></div>{" "}
        {/* Button placeholder */}
      </div>

      {/* Chart area */}
      <div className="flex mt-4 h-[160px] sm:h-[180px]">
        {/* Y Axis Labels */}
        <div className="flex flex-col justify-between mr-2 text-[10px] text-gray-500">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{ height: "32px" }}
              className="bg-gray-600 rounded w-6"
            ></div>
          ))}
        </div>

        {/* Grid and bars */}
        <div className="relative flex-1 overflow-hidden">
          {/* Horizontal dotted lines */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 w-full border-t border-dotted border-gray-600"
              style={{ top: `${i * 32}px` }}
            />
          ))}

          {/* Bar groups placeholders */}
          <div className="flex justify-around items-end h-full z-10 relative space-x-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-1">
                <div className="flex items-end space-x-1">
                  <div
                    className="w-2 rounded-sm bg-gray-600"
                    style={{ height: "40px" }}
                  ></div>
                  <div
                    className="w-2 rounded-sm bg-gray-500"
                    style={{ height: "30px" }}
                  ></div>
                  <div
                    className="w-2 rounded-sm bg-gray-700"
                    style={{ height: "20px" }}
                  ></div>
                </div>
                <div className="h-3 w-10 bg-gray-600 rounded"></div>{" "}
                {/* Label placeholder */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center text-xs text-gray-400 gap-3 mt-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="h-3 w-20 bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
