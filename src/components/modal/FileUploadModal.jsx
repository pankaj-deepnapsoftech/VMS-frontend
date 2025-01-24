import { useDataContext } from '@/context';
import React, { useRef } from 'react';
import { IoClose } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";



export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
}) => {

  
    const {UploadBulkData} = useDataContext()

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleSelectFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    UploadBulkData(files);
    if (files && files.length > 0) {
      // Handle the selected files here
      console.log('Selected files:', files);
    }
    onClose()
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-xl w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <IoClose size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 mt-2 text-sm">{subtitle}</p>
          )}
        </div>

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

        {/* Upload Progress (Example) */}
       
      </div>
    </div>
  );
};