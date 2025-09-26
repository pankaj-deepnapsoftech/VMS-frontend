import React from "react";
import { TrendingUp, ShieldAlert, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// eslint-disable-next-line react/prop-types
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-2xl rounded-2xl hover:scale-[1.02] transition-transform duration-300 ${className}`}
  >
    {children}
  </div>
);

// eslint-disable-next-line react/prop-types
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 space-y-4 ${className}`}>{children}</div>
);

const financialData = [
  { month: "Jan", exposure: 12000 },
  { month: "Feb", exposure: 15000 },
  { month: "Mar", exposure: 14000 },
  { month: "Apr", exposure: 18000 },
  { month: "May", exposure: 20000 },
  { month: "Jun", exposure: 17000 },
];

export default function SecurendDashboardCards() {
  return (
    <div className="text-white p-6 grid grid-cols-1 md:grid-cols-3 -mt-20 mb-20 gap-6">
      {/* Top 5 Risks */}
      <motion.div
        className="col-span-1"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardContent>
            <div className="flex items-center space-x-3">
              <ShieldAlert className="w-6 h-6 text-red-400 animate-pulse" />
              <h2 className="text-xl font-semibold">Top 5 Risks</h2>
            </div>
            <ul className="space-y-2 text-slate-300">
              {[
                "Phishing Attack",
                "Ransomware",
                "Insider Threat",
                "Data Leak",
                "Zero-Day Exploit",
              ].map((risk, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-between bg-slate-800 rounded-xl px-4 py-2 hover:bg-slate-700 transition cursor-pointer"
                >
                  <span>{risk}</span>
                  <span className="text-red-400 font-medium">High</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top 5 Risky Assets */}
      <motion.div
        className="col-span-1"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent>
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-yellow-400 animate-bounce" />
              <h2 className="text-xl font-semibold">Top 5 Risky Assets</h2>
            </div>
            <ul className="space-y-2 text-slate-300">
              {[
                "Server-01",
                "DB-Prod",
                "Workstation-45",
                "API Gateway",
                "Cloud Bucket",
              ].map((asset, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-between bg-slate-800 rounded-xl px-4 py-2 hover:bg-slate-700 transition cursor-pointer"
                >
                  <span>{asset}</span>
                  <span className="text-yellow-400 font-medium">Critical</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Financial Exposure Trend */}
      <motion.div
        className="col-span-1"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent>
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-semibold">
                Financial Exposure Trend
              </h2>
            </div>
            <div className="h-48 bg-slate-800 rounded-xl p-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderRadius: "0.5rem",
                      border: "1px solid #334155",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="exposure"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
