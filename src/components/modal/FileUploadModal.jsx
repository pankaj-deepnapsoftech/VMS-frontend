import { useRef } from "react";
import { MdClose } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";

export const Modal = ({ isOpen, onClose, title, method }) => {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleSelectFiles = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      method(file);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#015289] text-white rounded-t-2xl p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="hover:opacity-80 transition">
            <MdClose className="h-6 w-6" />
          </button>
        </div>
        {/* Content */}
        <div className="p-6 space-y-4">
          <ul className="text-gray-700 text-sm space-y-2">
            <li className="flex items-start space-x-2">
              <span className="w-3 h-3 mt-1 bg-[#015289] rounded-full"></span>
              <span>
                Please upload an Excel file in <strong>XLSX</strong> or <strong>XLS</strong> format.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-3 h-3 mt-1 bg-[#015289] rounded-full"></span>
              <span>Ensure the file is properly formatted and contains all necessary data.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-3 h-3 mt-1 bg-[#015289] rounded-full"></span>
              <span>
                If you need a sample file,{' '}
                <a href="./assets/Sample_Format.xlsx" download className="text-blue-600 underline">
                  Click Here
                </a>
                .
              </span>
            </li>
          </ul>
          {/* Upload Box */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100" onClick={handleSelectFiles}>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <IoCloudUploadOutline className="text-gray-400" size={32} />
              </div>
              <p className="text-gray-900 font-medium">Drag and drop Excel files to upload</p>
              <p className="text-sm text-gray-500">Supported formats: .xlsx, .xls</p>
              <button className="mt-4 px-4 py-2 bg-[#015289] text-white rounded-lg hover:bg-[#013b66] transition">
                Select Files
              </button>
              <input ref={fileInputRef} type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
