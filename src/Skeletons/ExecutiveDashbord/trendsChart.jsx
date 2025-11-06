// eslint-disable-next-line react/prop-types
const SimpleLineChartSkeleton = ({ className = "h-64 w-full" }) => (
  <div
    className={`relative rounded-2xl bg-[#1C2543] border border-[#303A60] p-4 flex flex-col ${className} animate-pulse`}
    aria-hidden="true"
  >
    {/* Header Skeleton */}
    <div className="h-4 w-1/3 bg-[#2A355E] rounded mb-5"></div>

    {/* Chart Area Skeleton */}
    <div className="flex-1 flex items-end">
      {/* Y-axis labels */}
      <div className="flex flex-col justify-between mr-2 h-full">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-3 w-7 bg-[#2A355E] rounded mb-2"></div>
        ))}
      </div>

      {/* Chart lines and points */}
      <div className="flex-1 relative flex items-end h-40">
        {/* Horizontal grid lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 w-full border-t border-dotted border-[#35467a]"
            style={{ top: `${i * 32}px` }}
          />
        ))}

        {/* Line skeleton */}
        <div className="w-full flex items-end justify-between h-full">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Simulated point */}
              <div className="w-3 h-3 bg-[#4F46E5] opacity-60 rounded-full mb-2"></div>
              {/* Simulated line segment */}
              <div className="w-2 h-20 bg-[#374376] rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default SimpleLineChartSkeleton;
