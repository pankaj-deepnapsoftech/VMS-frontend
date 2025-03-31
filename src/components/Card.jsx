import React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

function Card({ data }) {
  // Sample trend data for the mini-chart (upward trend)
  const chartData = [
    { value: 5 },
    { value: 10 },
    { value: 12 },
    { value: 15 },
    { value: 18 },
    { value: 22 },
  ];

  return (
    <div
      className={`p-2 pt-3 border bg-gradient-to-r ${data?.color} border-b hover:scale-95 transition ease-linear rounded-md shadow-sm flex items-center justify-between`}
    >
      {/* Left Side: Icon, Title & Value */}
      <div className="flex flex-col">
        {/* Icon & Title */}
        <div className="flex items-center gap-1 mb-0.5">
          {data?.icon && <data.icon className="h-5 w-5 text-white" />}
          <h3 className="text-sm text-white font-medium truncate">{data?.title}</h3>
        </div>

        {/* Value */}
        <p className="text-xl font-bold text-white leading-none pt-1">{data?.value}</p>
      </div>

      {/* Right Side: Mini Area Chart */}
      <div className="w-12 h-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <Area
              type="monotone"
              dataKey="value"
              stroke={data?.chartColor || "#FFFFFF"}
              fill={data?.chartColor || "#FFFFFF"}
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Card;
