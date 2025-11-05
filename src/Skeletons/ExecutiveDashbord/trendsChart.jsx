
// eslint-disable-next-line react/prop-types
const LineChartSkeletonLoading = ({ className = "h-64 w-full" }) => {
  return (
    <div
      className={`relative rounded-2xl bg-[#1C2543] border border-[#303A60] p-4 ${className}`}
      aria-hidden="true"
    >
      {/* Header / title skeleton */}
      <div className="h-4 w-1/4 bg-[#2A355E] rounded-md mb-3 animate-pulse" />

      {/* SVG chart placeholder */}
      <div className="w-full h-[calc(100%-1.25rem)] overflow-hidden rounded-lg">
        <svg viewBox="0 0 600 300" preserveAspectRatio="none" className="w-full h-full">
          {/* Background grid */}
          <defs>
            <linearGradient id="shimmer" x1="0" x2="1">
              <stop offset="0%" stopColor="#2A355E" stopOpacity="1" />
              <stop offset="50%" stopColor="#3A4472" stopOpacity="1" />
              <stop offset="100%" stopColor="#2A355E" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* horizontal grid lines */}
          {[0, 60, 120, 180, 240].map((y) => (
            <line
              key={y}
              x1="40"
              x2="580"
              y1={y + 20}
              y2={y + 20}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          ))}

          {/* vertical faint ticks */}
          {[60, 180, 300, 420, 540].map((x) => (
            <line
              key={x}
              x1={x}
              x2={x}
              y1="20"
              y2="260"
              stroke="rgba(255,255,255,0.02)"
              strokeWidth="1"
            />
          ))}

          {/* fake area fill */}
          <path
            d="M40 220 C 120 160, 200 120, 280 140 C 360 160, 440 100, 540 80 L540 260 L40 260 Z"
            fill="url(#shimmer)"
            opacity="0.08"
          />

          {/* fake line (stroke) */}
          <path
            d="M40 220 C 120 160, 200 120, 280 140 C 360 160, 440 100, 540 80"
            fill="none"
            stroke="#4F46E5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="skeleton-line"
            style={{ filter: "url(#blur)" }}
          />

          {/* fake points */}
          {[40, 160, 280, 360, 440, 540].map((cx, i) => (
            <circle
              key={i}
              cx={cx}
              cy={[220, 160, 120, 140, 100, 80][i]}
              r="4.5"
              fill="#111827"
              stroke="#4F46E5"
              strokeWidth="2"
            />
          ))}

          {/* shimmer overlay (animated) */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#shimmer)"
            className="animate-shimmer"
            style={{ mixBlendMode: "overlay", opacity: 0.12 }}
          />
        </svg>
      </div>
    </div>
  );
};

export default LineChartSkeletonLoading;
