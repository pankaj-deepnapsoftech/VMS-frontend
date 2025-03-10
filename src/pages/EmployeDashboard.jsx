import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAllEmployeeContext, useAuthContext, useDataContext } from '@/context';
import { FiAlertCircle } from 'react-icons/fi';
import { BiPlus } from 'react-icons/bi';
import { Modal } from '@/components/modal/FileUploadModal';



function EmployeeDashboard() {



  const {
    employeeCardData,
    EmployeeData,
    datafetchCount,
    setdatafetchCount,
  } = useAllEmployeeContext();


  const { token } = useAuthContext();

  useEffect(() => {
    EmployeeData();
    if (token && datafetchCount === 0) {
      setdatafetchCount(1);
    }
  }, [token])


  const data = [
    { name: "In Progress", value: employeeCardData.inProgress },
    { name: "Open", value: employeeCardData.open },
    { name: "Reopen", value: employeeCardData.reopen },
    { name: "Closed", value: employeeCardData.closed },
    { name: "On Hold", value: employeeCardData.onHold },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-6 ">



        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
          {Object.keys(employeeCardData)?.map((item, idx) => {
            return (<div key={idx}
              className="bg-white rounded-lg shadow p-6 hover:scale-105  transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base  text-black capitalize">{item === "totalData" ? "Total" : item.replace(/([a-z])([A-Z])/g, "$1 $2")} Task</h3>
                <FiAlertCircle className="text-red-500" size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-3xl ">{employeeCardData[item]}</p>


              </div>
            </div>
            )
          })}
        </div>

        {/* Charts Section */}

        <div className="w-full h-96 py-6 rounded-lg shadow bg-white flex justify-center items-center hover:scale-95  transition">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>



      </div>

    </>

  );
}

export default EmployeeDashboard;