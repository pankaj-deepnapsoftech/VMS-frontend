import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { MdClose } from "react-icons/md";

// Set up the PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// eslint-disable-next-line react/prop-types
const ReportModal = ({ file, close }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  if (!file) return null;

  // Determine file type
  // eslint-disable-next-line react/prop-types
  const isPDF = file.toLowerCase().endsWith(".pdf");
  // eslint-disable-next-line react/prop-types
  const isImage = file.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|webp)$/);

  // Handle PDF load success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  // Go to previous page
  const goToPreviousPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Go to next page
  const goToNextPage = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b p-4 bg-[#015289]">
          <h2 className="text-lg font-semibold text-white">View Report</h2>
          <button
            onClick={() => close(false)}
            className="text-white hover:text-gray-200 transition"
          >
            <MdClose className="h-6 w-6" />
          </button>
        </div>

        {/* File Preview Section */}
        <div className="p-4 h-[70vh] overflow-auto flex flex-col items-center justify-center bg-gray-100">
          {isPDF ? (
            <>
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => console.error("Failed to load PDF:", error)}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={goToPreviousPage}
                  disabled={pageNumber <= 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Previous
                </button>
                <p className="text-gray-700">
                  Page {pageNumber} of {numPages}
                </p>
                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          ) : isImage ? (
            <img
              src={file}
              alt="Report Preview"
              className="max-w-full max-h-full rounded-lg shadow-md"
              onError={(e) => {
                console.error("Failed to load image:", e);
                e.target.style.display = "none";
              }}
            />
          ) : (
            <p className="text-center text-gray-700">Unsupported file format</p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between p-4 border-t">
          <button
            onClick={() => close(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Close
          </button>
          <a
            href={file}
            download
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Download File
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;