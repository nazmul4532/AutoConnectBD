import React, { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CartProduct from "./CartProduct";

const CartOverlay = ({
  isOpen,
  onClose,
  cartProducts,
  removeProduct,
  proceedToCheckout,
}) => {
  const fixedShippingCost = 100;
  const subtotal =
    cartProducts.length > 0
      ? cartProducts.reduce(
          (sum, product) => sum + product.unitPrice * product.quantity,
          0
        )
      : 0;

  const total = subtotal + fixedShippingCost;

  useEffect(() => {
    proceedToCheckout({
      subtotal: subtotal,
      total: total,
      shippingCost: fixedShippingCost,
    });
  }, [subtotal, total, fixedShippingCost]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="relative p-6 w-full md:max-w-2xl lg:max-w-3xl h-3/4 md:h-auto mx-auto bg-white rounded-xl shadow-2xl overflow-y-auto">
            {/* Cart header */}
            <div className="p-4 border-b border-gray-300 flex items-center justify-between sticky top-0 bg-white z-10">
              <span className="font-bold text-xl">Your Cart</span>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Close cart"
              >
                <AiOutlineCloseCircle className="w-8 h-8" />
              </button>
            </div>

            {/* Products in the Cart */}
            <div className="p-4 overflow-y-auto max-h-[50vh]">
              {cartProducts.length === 0 ? (
                <div className="flex h-36 justify-center items-center">
                  <span className="font-bold text-lg text-gray-500">
                    Your cart is empty.
                  </span>
                </div>
              ) : (
                cartProducts.map((product) => (
                  <CartProduct
                    key={product._id}
                    product={product}
                    removeProduct={removeProduct}
                  />
                ))
              )}
            </div>

            {/* Subtotal and Total */}
            {cartProducts.length > 0 && (
              <div className="p-4 border-t border-gray-300">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">Shipping:</span>
                  <span>${fixedShippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mt-4 text-lg">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-green-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartOverlay;
