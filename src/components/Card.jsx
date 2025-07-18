/* eslint-disable react/prop-types */


function Card({ data }) {


  return (
    <div
      className={`p-2 pt-3 border bg-gradient-to-r ${data?.color} ${data?.border} border-b hover:scale-95 transition ease-linear rounded-md shadow-sm `}
    >
      {/* Left Side: Icon, Title & Value */}
      <div className="flex h-12 items-center justify-between w-full ">
        {/* Icon & Title */}
        <div className="flex gap-2 mb-0.5">
          {data?.icon && <data.icon className="h-5 w-5 text-white" />}
          <h3 className="text-sm text-white font-semibold truncate  ">{data?.title}</h3>
        </div>

        {/* Value */}
        <p className="text-lg font-bold text-white leading-none pt-1 text-end pe-5 w-full ">{data?.value}</p>
      </div>

      
    </div>
  );
}

export default Card;
