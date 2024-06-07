import React from "react";
import { AiFillStar, AiOutlineShoppingCart } from "react-icons/ai";

const ProductCard = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <a href="#">
        <img
          className="w-full h-48 object-cover"
          src={product.img[0]}
          alt={product.name}
        />
      </a>
      <div className="p-6">
        <a href="#">
          <h5 className="text-xl font-bold text-theme-black mb-2">
            {product.name}
          </h5>
        </a>
        <div className="flex items-center mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <AiFillStar
                key={i}
                className={`w-5 h-5 ${
                  i < product.averageRating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded ml-2">
            {product.averageRating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            BDT {product.unitPrice}
          </span>
          <button
            onClick={handleAddToCart} // Call handleAddToCart on click
            className="text-white bg-theme-red hover:bg-theme-black focus:ring-4 focus:outline-none focus:ring-theme-black font-medium rounded-lg text-sm px-4 py-2.5 text-center flex items-center"
          >
            <AiOutlineShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
