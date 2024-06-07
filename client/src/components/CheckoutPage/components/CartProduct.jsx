import React from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const CartProduct = ({ product, removeProduct }) => {
  const cartValue = product.price * product.quantity;

  return (
    <div className="flex flex-col gap-6 bg-white p-4 rounded-lg shadow-md">
      {/* Cart Details */}
      <div className="flex flex-row gap-4 items-center justify-between">
        {/* Product Thumbnail */}
        <div className="flex items-center gap-4">
          <img
            className="w-16 h-16 rounded-md object-cover"
            src={product.image}
            alt={product.name}
          />
          {/* Product and Cart Details */}
          <div className="flex flex-col text-gray-700">
            <span className="font-semibold text-lg">{product.name}</span>
            <span className="text-sm">
              ${product.unitPrice.toFixed(2)} x {product.quantity}{" "}
              <strong className="text-black">${cartValue.toFixed(2)}</strong>{" "}
            </span>
          </div>
        </div>
        <div>
          <button
            onClick={() => removeProduct(product._id)}
            className="text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 p-1 rounded-md"
            aria-label="Remove product"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
