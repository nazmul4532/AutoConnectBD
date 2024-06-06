import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

//components
import NavigationBar from "./components/NavBar";
import Breadcrumb from "./components/Breadcrumb";
import ProductList from "./components/ProductList";

const products = [
  {
    id: 1,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    image: "/bgImage.jpg",
    rating: 3,
    price: 599,
  },
  {
    id: 1,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    image: "/bgImage.jpg",
    rating: 0,
    price: 599,
  },
  {
    id: 1,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    image: "/bgImage.jpg",
    rating: 4.5,
    price: 599,
  },
  {
    id: 1,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    image: "/bgImage.jpg",
    rating: 4.5,
    price: 599,
  },
  {
    id: 1,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    image: "/bgImage.jpg",
    rating: 4.5,
    price: 599,
  },
  {
    id: 1,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    image: "/bgImage.jpg",
    rating: 4.5,
    price: 599,
  },
  {
    id: 1,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    image: "/bgImage.jpg",
    rating: 4.5,
    price: 599,
  },
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
      <ProductList products={products} categories={categories} />
      <ToastContainer />
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-theme-black text-white rounded-full p-4 shadow-md hover:bg-theme-gray">
          <AiOutlineShoppingCart className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
