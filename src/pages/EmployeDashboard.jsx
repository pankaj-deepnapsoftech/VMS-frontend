import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAllEmployeeContext, useAuthContext, useDataContext } from '@/context';
import { FiAlertCircle } from 'react-icons/fi';
import { BiPlus } from 'react-icons/bi';
import { Modal } from '@/components/modal/FileUploadModal';
import Card from '@/components/Card';
import { IoShieldCheckmarkOutline, IoShieldOutline } from 'react-icons/io5';



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

console.log("employeeCardData",employeeCardData)
 const metrics = [
    {
      title: "Total Data",
      value: employeeCardData?.totalData ,
      color: "from-[#F24E1E] to-[#FF866B]", // Figma Red gradient
      icon: IoShieldOutline,
      chartColor: "#FFF",
    },
    {
      title: "Low",
      value: employeeCardData?.open,
      color: "from-[#0D99FF] to-[#74C0FC]", // Figma Blue gradient
      icon: IoShieldOutline,
      chartColor: "#FFF",
    },
    {
      title: "Medium",
      value: employeeCardData?.reopen,
      color: "from-[#63A833] to-[#9EE999]", // Figma Cyan gradient
      icon: IoShieldOutline,
      chartColor: "#FFF",
    }, 
     {
      title: "Critical",
      value: employeeCardData?.inProgress,
      icon: IoShieldCheckmarkOutline,
      color: "from-[#0D99FF] to-[#74C0FC]", // Dark Gray gradient
      chartColor: "#FFF",
    },{
      title: "Critical",
      value: employeeCardData?.closed
      ,
      icon: IoShieldCheckmarkOutline,
      color: "from-[#63A833] to-[#6EE999]", // Dark Gray gradient
      chartColor: "#FFF",
    },{
      title: "Critical",
      value: employeeCardData?.onHold,
      icon: IoShieldCheckmarkOutline,
      color: "from-[#333333] to-[#666666]", // Dark Gray gradient
      chartColor: "#FFF",
    },
  ];



  return (
    <>
      <div className="min-h-screen bg-gray-100 px-6 ">



        {/* Metrics Grid */}
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-2 py-2">
         
          {metrics.map((metric, index) => (
            <Card key={index} data={metric} />
          ))}
        
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