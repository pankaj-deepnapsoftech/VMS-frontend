import React from 'react'
import { SlGraph } from "react-icons/sl";

function Card({ data, index }) {
  return (
    <div key={index} className="p-2 border-r bg-indigo-200 border-b hover:scale-95 transition ease-linear rounded">
      <div className="flex items-center justify-start gap-2 mb-1 ">
        <data.icon className="h-5 w-5 text-blue-600" />
        <h3 className="text-sm text-gray-600 font-semibold">{data.title}</h3>
        
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-sky-700">{data.value}</p>
        {/* {data.title === "Remedition"? (
           <p className="text-sm text-gray-500 flex items-center gap-2">
          <SlGraph className='text-teal-500'/>in progress</p>
        ): null} */}
       
      </div>
    </div>
  )
}

export default Card;