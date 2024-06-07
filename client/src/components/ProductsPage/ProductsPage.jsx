import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

//components
import NavigationBar from "./components/NavBar";
import Breadcrumb from "./components/Breadcrumb";
import ProductList from "./components/ProductList";
import CartOverlay from "./components/CartOverlay";

const categories = [
  { id: 1, name: "Battery" },
  { id: 2, name: "Car Parts" },
  { id: 3, name: "Oil" },
];

const links = [
  { title: "Products", url: "/customer/products" },
  // { title: "Appointments", url: "/customer/appointments" },
  { title: "Order History", url: "/customer/order-history" },
  { title: "Logout", url: "/logout" },
];

const ProductsPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCounter, setCartCounter] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = localStorage.getItem("accessToken");

  const getProductData = async (query = "") => {
    try {
      console.log("Fetching Products");
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/product/searchProducts?name=${query}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Error fetching products");
      }

      const products = await res.json();
      setProducts(products);
      console.log("Products:", products);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server Error");
    }
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    getProductData(query); // Fetch products based on the search query
  };

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
    console.log(product);
    console.log(cartProducts);
    if (productExists(product._id)) {
      setCartProducts(updateQuantity(product._id, 1));
    } else {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    }
    setCartCounter(cartCounter + 1);
    console.log(cartProducts);
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

  const placeOrder = () => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    toast.success("Order placed successfully!");
    window.location.href = "/customer/checkout";
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <NavigationBar
        logoUrl="/car.ico"
        userName={user.name}
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
            value={searchQuery} // Bind the input value to the searchQuery state
            onChange={handleSearchInputChange} // Handle input change
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
        placeOrder={placeOrder}
      />
    </div>
  );
};

export default ProductsPage;
