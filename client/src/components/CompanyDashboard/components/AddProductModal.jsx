import React, { useState } from "react";
import { MdClose, MdAdd } from "react-icons/md";
import CreatableSelect from "react-select/creatable";

const AddProductModal = ({ isOpen, onClose, onConfirm }) => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    quantity: 0,
    unitPrice: "",
    categories: [],
  });

  const categoryOptions = [
    { value: "Battery", label: "Battery" },
    { value: "Shock Absorber", label: "Shock Absorber" },
    { value: "Spark Plug", label: "Spark Plug" },
    { value: "Gasket", label: "Gasket" },
    { value: "Insulator", label: "Insulator" },
    { value: "Oil", label: "Oil" },
    { value: "Motor Oil", label: "Motor Oil" },
    { value: "Steering Oil", label: "Steering Oil" },
    { value: "Control Arm", label: "Control Arm" },
    { value: "Tyres", label: "Tyres" },
    { value: "Commercial", label: "Commercial" },
    { value: "Passenger", label: "Passenger" },
    { value: "MotorCycle", label: "MotorCycle" },
    { value: "Engine Parts", label: "Engine Parts" },
    { value: "Brakes", label: "Brakes" },
    { value: "Suspension", label: "Suspension" },
    { value: "Exhaust", label: "Exhaust" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleCategoryChange = (newValue) => {
    setProductDetails({
      ...productDetails,
      categories: newValue ? newValue.map((option) => option.value) : [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(productDetails);
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative bg-theme-white rounded-lg shadow-xl max-w-md p-6">
          <div className="flex justify-between mb-4">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={onClose}
            >
              <MdClose className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="text-center">
            <MdAdd className="w-12 h-10 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-3 text-lg font-normal text-gray-500">
              Add New Product
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                value={productDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="unitPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Unit Price
              </label>
              <input
                type="text"
                name="unitPrice"
                id="unitPrice"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                value={productDetails.unitPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                value={productDetails.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="categories"
                className="block text-sm font-medium text-gray-700"
              >
                Categories
              </label>
              <CreatableSelect
                isMulti
                name="categories"
                options={categoryOptions} // Options can be left empty as users can create new ones
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleCategoryChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                className="cursor-pointer block w-full font-medium py-2 px-4 text-gray-700 border border-gray-300 rounded cursor-pointer bg-gray-200 hover:bg-gray-300 focus:outline-none"
                onChange={(e) => {
                  setProductDetails({
                    ...productDetails,
                    image: e.target.files[0],
                  });
                }}
                required
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={handleSubmit}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
