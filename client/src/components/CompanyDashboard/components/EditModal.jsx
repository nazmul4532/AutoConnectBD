import React, { useEffect, useState } from "react";
import { MdClose, MdOutlineEdit } from "react-icons/md";

const EditModal = ({ isOpen, onClose, onConfirm, initialProductDetails }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && initialProductDetails) {
      setProductName(initialProductDetails.name);
      setProductPrice(initialProductDetails.unitPrice); 
    }
    if (!isOpen) {
      setProductName("");
      setProductPrice(0);
      setProductImage(null);
      setError("");
    }
  }, [isOpen, initialProductDetails]);

  const handleNameChange = (event) => setProductName(event.target.value);
  const handlePriceChange = (event) =>
    setProductPrice(parseFloat(event.target.value));

  const handleImageChange = (event) => {
    setProductImage(event.target.files[0]);
  };

  const handleConfirm = () => {
    if (!productName || productPrice <= 0) {
      setError("Please fill in all fields with valid values.");
      return;
    }
    onConfirm({
      name: productName,
      price: productPrice,
      image: productImage,
    });
  };

  if (!isOpen) return null;

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
            className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <MdClose className="w-5 h-5" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <MdOutlineEdit className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Edit Product Details
            </h3>
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                value={productName}
                onChange={handleNameChange}
                className="bg-gray-50 w-full h-12 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2.5 py-1"
                placeholder="Product Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="productPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Price
              </label>
              <input
                id="productPrice"
                type="number"
                value={productPrice}
                onChange={handlePriceChange}
                className="bg-gray-50 w-full h-12 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2.5 py-1"
                placeholder="Product Price"
                min="0.01"
                step="0.01"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="productImage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Image
              </label>
              <input
                id="productImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer block w-full font-medium py-2 px-4 text-gray-700 border border-gray-300 rounded cursor-pointer bg-gray-200 hover:bg-gray-300 focus:outline-none"
              />
            </div>
            {error && (
              <div className="mb-4 text-red-600 font-medium">{error}</div>
            )}
            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              onClick={handleConfirm}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-2"
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

export default EditModal;
