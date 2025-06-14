/* eslint-disable react/prop-types */
import React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

function Card({ data }) {
  // Sample trend data for the mini-chart (upward trend)
  const chartData = [
    { value: 0 },
    { value: 100 },
    { value: 10 },
    { value: 200 },
    { value: 80 },
    { value: 300 },
  ];

  return (
    <div
      className={`p-2 pt-3 border bg-gradient-to-r ${data?.color} ${data?.border} border-b hover:scale-95 transition ease-linear rounded-md shadow-sm flex items-center justify-between`}
    >
      {/* Left Side: Icon, Title & Value */}
      <div className="flex h-12 items-center w-full ">
        {/* Icon & Title */}
        <div className="flex items-center gap-2 mb-0.5">
          {data?.icon && <data.icon className="h-5 w-5 text-white" />}
          <h3 className="text-sm text-white font-semibold truncate  ">{data?.title}</h3>
        </div>

        {/* Value */}
        <p className="text-lg font-bold text-white leading-none pt-1 text-center w-full ">{data?.value}</p>
      </div>

      {/* Right Side: Mini Area Chart */}
      {/* <div className="w-20 h-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <Area
              type="basis"
              dataKey="value"
              stroke={data?.chartColor || "#FFFFFF"}
              fill={data?.chartColor || "#FFFFFF"}
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}

export default Card;
