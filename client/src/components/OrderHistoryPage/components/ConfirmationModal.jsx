import React from "react";
import { MdClose } from "react-icons/md";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative w-full max-w-md p-4">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-3 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5"
            onClick={onClose}
          >
            <MdClose className="w-5 h-5" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-700">
              Are you sure you want to change the status?
            </h3>
            <button
              type="button"
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
              onClick={onConfirm}
            >
              Confirm Change
            </button>
            <button
              type="button"
              className="w-full mt-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline border border-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
