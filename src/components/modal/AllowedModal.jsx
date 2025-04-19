/* eslint-disable react/prop-types */
import Multiselect from "multiselect-react-dropdown";
import { IoCloseSharp } from "react-icons/io5";

const AllowedModal = ({ setIsChecked, isChecked }) => {
    return (
        <div id="default-modal" data-modal-show="true" aria-hidden="true" className={` ${isChecked ? "" : "hidden"}  overflow-x-hidden overflow-y-auto fixed top-10 md:h-full md:inset-0 z-50 flex  justify-center items-center`}>
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">

                <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">

                    <div className="flex items-start justify-between bg-gradient-to-bl from-[#333333] to-[#666666] text-white p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className=" text-xl lg:text-2xl font-semibold d">
                            Terms of Service
                        </h3>
                        <button onClick={() => setIsChecked(!isChecked)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal">
                            <IoCloseSharp size={20} />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <Multiselect
                            options={[]} // Options to display in the dropdown
                            selectedValues={""} // Preselected value to persist in dropdown
                            onSelect={""} // Function will trigger on select event
                            onRemove={""} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                        />
                    </div>

                    <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" className="bg-gradient-to-bl from-[#333333] to-[#666666] text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                        <button type="button" className="text-gray-500 bg-white hover:bg-gradient-to-bl hover:text-white from-[#333333] to-[#666666] text-whitefocus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Decline</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllowedModal