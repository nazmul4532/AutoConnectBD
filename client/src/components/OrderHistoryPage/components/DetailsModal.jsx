import React from "react";
import { MdClose } from "react-icons/md";

const DetailsModal = ({ isOpen, onClose, order }) => {
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
            className="absolute top-3 right-2.5 text-theme-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <MdClose className="w-5 h-5" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Order Details
            </h3>
            {/* Render order details here */}
            <div className="text-left">
              <p>
                <span className="font-semibold">Order ID:</span> {order._id}
              </p>
              <p>
                <span className="font-semibold">Customer:</span>{" "}
                {order.customerName}
              </p>
              <p>
                <span className="font-semibold">Total Price:</span> BDT{" "}
                {order.totalPrice}
              </p>
              <p>
                <span className="font-semibold">Order Status:</span>{" "}
                {order.orderStatus}
              </p>
              <p className="font-semibold">Order List:</p>
              <ul>
                {order.orderList.map((product) => (
                  <li key={product.productId}>
                    {product.productName} - Quantity: {product.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
