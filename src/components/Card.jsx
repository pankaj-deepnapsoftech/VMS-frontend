import React from 'react'

function Card({data}) {
  return (
    <div key={data.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600">{data.title}</h3>
              <data.icon className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-semibold">{data.value}</p>
              <p className="text-sm text-gray-500">{data.change}</p>
            </div>
          </div>
  )
}

export default Card;