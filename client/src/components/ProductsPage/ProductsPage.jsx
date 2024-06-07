import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

//components
import NavigationBar from "./components/NavBar";
import Breadcrumb from "./components/Breadcrumb";
import ProductList from "./components/ProductList";
import CartOverlay from "./components/CartOverlay";

const products = [
  {
    _id: 1,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    image: "/bgImage.jpg",
    rating: 3,
    price: 599,
  },
  {
    _id: 2,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    image: "/bgImage.jpg",
    rating: 3,
    price: 599,
  },
  {
    _id: 3,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    image: "/bgImage.jpg",
    rating: 3,
    price: 599,
  },
  // Add more product objects here...
];

const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Home & Garden" },
];

const links = [
  { title: "Products", url: "/customer/products" },
  { title: "Appointments", url: "/customer/appointments" },
];

const ProductsPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCounter, setCartCounter] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const productExists = (productId) => {
    return cartProducts.some((product) => product._id === productId);
  };

  const updateQuantity = (productId, quantity) => {
    return cartProducts.map((product) => {
      if (product._id === productId) {
        return { ...product, quantity: product.quantity + quantity };
      }
      return product;
    });
  };

  const addToCart = (product) => {
    if (productExists(product._id)) {
      setCartProducts(updateQuantity(product._id, 1));
    } else {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    }
    setCartCounter(cartCounter + 1);
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

  useEffect(() => {
    setCartCounter(calculateTotalQuantity(cartProducts));
  }, [cartProducts]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <NavigationBar
        logoUrl="/car.ico"
        userName="John Doe"
        userAvatarUrl="/bgImage.jpg"
        links={links}
      />
      <Breadcrumb />
      <div className="flex flex-col justify-center items-center border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold mb-4">Products Page</h1>
        <div className="w-full max-w-md relative mb-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 bg-theme-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-red"
          />
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <ProductList
        products={products}
        categories={categories}
        addToCart={addToCart}
      />
      <ToastContainer />
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
        cartCounter={cartCounter}
        setCartCounter={setCartCounter}
        cartProducts={cartProducts}
        removeProduct={removeProduct}
      />
    </div>
  );
};

export default ProductsPage;
