import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

// components
import NavBar from "./components/NavBar";
import CheckoutForm from "./components/CheckoutForm";
import CartOverlay from "./components/CartOverlay";
import ReviewStep from "./components/ReviewStep";

const links = [
  { title: "Products", url: "/customer/products" },
  { title: "Appointments", url: "/customer/appointments" },
  { title: "Logout", url: "/logout" },
];

const CheckoutPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCounter, setCartCounter] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    total: 0,
    shippingCost: 0,
  });

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const loadCartProducts = () => {
    const storedCartProducts = localStorage.getItem("cartProducts");
    if (storedCartProducts) {
      const cart = JSON.parse(storedCartProducts);
      setCartProducts(cart);
      setCartCounter(calculateTotalQuantity(cart));
    }
  };

  const removeProduct = (productId) => {
    const productToRemove = cartProducts.find(
      (product) => product._id === productId
    );
    const quantityToRemove = productToRemove ? productToRemove.quantity : 0;

    const updatedCartProducts = cartProducts.filter(
      (product) => product._id !== productId
    );
    setCartProducts(updatedCartProducts);
    setCartCounter(cartCounter - quantityToRemove);
  };

  const calculateTotalQuantity = (cartProducts) => {
    return cartProducts.reduce((total, product) => total + product.quantity, 0);
  };

  const proceedToCheckout = (totals) => {
    setCartTotals(totals);
  };

  useEffect(() => {
    setCartCounter(calculateTotalQuantity(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    loadCartProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <NavBar
        logoUrl="/car.ico"
        userName={user.name}
        userAvatarUrl="/bgImage.jpg"
        links={links}
      />
      <CheckoutForm cartTotals={cartTotals} />
      <div className="fixed bottom-8 right-8 z-50">
        <button
          className="bg-theme-black text-white rounded-full p-4 shadow-md hover:bg-theme-gray flex items-center"
          onClick={toggleCart}
        >
          <AiOutlineShoppingCart className="w-6 h-6 mr-2" />
          {cartCounter > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              {cartCounter}
            </span>
          )}
        </button>
      </div>
      {/* Cart overlay */}
      <CartOverlay
        isOpen={isCartOpen}
        onClose={closeCart}
        cartProducts={cartProducts}
        removeProduct={removeProduct}
        proceedToCheckout={proceedToCheckout}
      />
    </div>
  );
};

export default CheckoutPage;
