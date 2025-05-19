import React from "react";

const data = [
  { id: "A1", text: "UNIFIED ASSET INVENTORY", x: -250, y: -180 },
  { id: "A2", text: "COMPLIANCE & EXECUTIVE REPORTING", x: -280, y: -60 },
  { id: "A3", text: "RISK RESPONSE ORCHESTRATION", x: -280, y: 60 },
  { id: "A4", text: "PRIORITIZE WITH SECRISK SCORE", x: -220, y: 170 },
  { id: "A5", text: "QUANTIFY WITH BUSINESS CONTEXT", x: 180, y: 180 },
  { id: "A6", text: "ENRICH WITH THREAT INTELLIGENCE", x: 240, y: 60 },
  { id: "A7", text: "RISK FACTOR AGGREGATION", x: 250, y: -60 },
  { id: "A8", text: "AI powered Risk Remediation", x: 200, y: -180 },
  { id: "A9", text: "AUTOMATED RISK PLAYBOOKS", x: 0, y: 280 },
];

export default function RiskOperations() {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] flex items-center justify-center p-6">
      <div className="relative w-[300px] h-[300px]">
        {/* Central Circle */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-purple-400 to-pink-400 flex flex-col items-center justify-center text-white text-2xl font-bold shadow-xl">
          <span className="text-center leading-tight">Risk<br />Operations</span>
        </div>

        {/* Items Around the Circle */}
        {data.map((item) => (
          <div
            key={item.id}
            className="absolute w-60 text-center text-base font-semibold text-white"
            style={{
              top: `calc(50% + ${item.y}px - 1.5rem)`,
              left: `calc(50% + ${item.x}px - 7.5rem)`
            }}
          >
            <div className="flex items-center justify-center mb-1">
              <div className="w-10 h-10 rounded-full bg-cyan-500 text-white text-sm flex items-center justify-center font-bold">
                {item.id}
              </div>
            </div>
            <div>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
