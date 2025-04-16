/* eslint-disable react/prop-types */


const BarGraph = ({ data }) => {
  return (
    <div className="w-full max-w-2xl space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">{item.label}</span>
            <span className="text-gray-500">{item.value.toFixed(2)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-1000 ease-out"
              style={{
                width: `${item.value}%`,
                backgroundColor: item.color,
                animation: 'growWidth 1.5s ease-out'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default BarGraph;