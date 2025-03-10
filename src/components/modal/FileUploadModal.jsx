import { useDataContext } from '@/context';
import React, { useRef } from 'react';
import { IoClose } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdClose } from 'react-icons/md';



export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  method
}) => {




  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleSelectFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    console.log(files, "method name")
    method(files);


    if (files && files.length > 0) {
      // Handle the selected files here

    }
    onClose()
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ">

      <div className="bg-white rounded-xl max-w-xl w-full">
        <div className="flex justify-between items-center rounded-t-xl border-b p-4 bg-[#015289]">
          <h2 className="text-lg font-semibold text-gray-200">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-100 hover:text-gray-200 transition"
          >
            <MdClose className="h-6 w-6" />
          </button>
        </div>
        <div className='p-4'>
          <ul className="text-left space-y-3 mb-4">

            <li className="flex items-start space-x-2">
              <span className="w-3 h-3 mt-1 bg-[#015289] rounded-full"></span>
              <span className="text-gray-700 text-sm">Please upload an Excel file in <strong>XLSX</strong> or <strong>XLS</strong> format.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-3 h-3 mt-1 bg-[#015289] rounded-full"></span>
              <span className="text-gray-700 text-sm ">Ensure the file is properly formatted and contains all necessary data.</span>
            </li><li className="flex items-start space-x-2">
              <span className="w-3 h-3 mt-1 bg-[#015289] rounded-full"></span>
              <span className="text-gray-700 text-sm">If you want to download a sample file,
                <a href="./assets/Sample_Format.xlxs" download className="text-blue-600 underline">Click Here</a>.
              </span>
            </li>
          </ul>


          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:bg-slate-300">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <IoCloudUploadOutline className="text-gray-400" size={32} />
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drag and drop Excel files to upload
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supported formats: .xlsx, .xls
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={handleSelectFiles}
                type="file"
                accept=".xlsx,.xls"
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Select files
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};