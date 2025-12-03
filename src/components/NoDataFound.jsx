import { BiErrorAlt } from '@/constants/Icons';


const NoDataFound = () => {
    return (
        <div className="relative  flex flex-col items-center justify-center min-h-screen px-4 py-10">
            <div className="flex items-center justify-center mb-4">
                <BiErrorAlt className="text-red-400 w-14 h-14 md:w-24 md:h-24" />
            </div>

            <h2 className="text-2xl md:text-2xl font-bold text-gray-600 mb-4 text-center">
                No data found
            </h2>
            <p className="text-sm md:text-base text-gray-600 text-center mb-8 max-w-md px-4">
                Please create or select the appropriate filters from the drop down. </p>

        </div>
    );
};

export default NoDataFound;
