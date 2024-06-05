import React, { useEffect, useState } from "react";
import { MdClose, MdOutlineInsertChartOutlined } from "react-icons/md";

const QuantityModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemQuantity,
  action,
  itemId, // Add itemId prop
}) => {
  const [quantityInput, setQuantityInput] = useState(0);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.valueAsNumber;
    setQuantityInput(value);
    if (action === "decrease" && value > itemQuantity) {
      setError("Cannot decrease by more than the current quantity.");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setQuantityInput(0);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const actionText = action === "increase" ? "increase" : "decrease";
  const buttonText = action === "increase" ? "Increase" : "Decrease";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md p-4">
        <div className="relative bg-theme-white rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-theme-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <MdClose className="w-5 h-5" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <MdOutlineInsertChartOutlined className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              How many units do you want to {actionText} the stock amount by?
            </h3>
            <div className="flex justify-center mb-4">
              <input
                type="number"
                value={quantityInput}
                onChange={handleInputChange}
                className="bg-gray-50 w-24 h-12 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2.5 py-1 text-center"
                placeholder="Enter quantity"
                min="1"
                required
              />
            </div>
            {error && (
              <div className="mb-4 text-red-600 font-medium">{error}</div>
            )}
            <button
              type="button"
              className="bg-green-600 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              onClick={() => {
                if (action === "decrease" && quantityInput > itemQuantity) {
                  setError(
                    "Cannot decrease by more than the current quantity."
                  );
                } else {
                  onConfirm(quantityInput, itemId); // Pass itemId to onConfirm
                }
              }}
            >
              Confirm {buttonText}
            </button>
            <button
              type="button"
              className="bg-red-600 hover:bg-theme-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-2 border border-gray-300"
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

export default QuantityModal;