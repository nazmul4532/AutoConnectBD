import React from "react";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
  AiOutlineSetting,
  AiOutlineLogin,
  AiOutlineProfile,
  AiOutlineHistory,
} from "react-icons/ai"; // Import icons from react-icons
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";
import NavigationBar from "./components/NavBar";
import Breadcrumb from "./components/Breadcrumb"; // Import Breadcrumb component

const ProductManufacturerDashboard = () => {
  // Sample JSON data
  const data = [
    {
      name: "Apple Watch",
      image: "/docs/images/products/apple-watch.png",
      quantity: 1,
      price: "$599",
    },
    {
      name: 'iMac 27"',
      image: "/docs/images/products/imac.png",
      quantity: 7,
      price: "$2499",
    },
    {
      name: "iPhone 12",
      image: "/docs/images/products/iphone-12.png",
      quantity: 1,
      price: "$999",
    },
    {
      name: "iPhone 12",
      image: "/docs/images/products/iphone-12.png",
      quantity: 1,
      price: "$999",
    },
    {
      name: "iPhone 12",
      image: "/docs/images/products/iphone-12.png",
      quantity: 1,
      price: "$999",
    },
    {
      name: "iPhone 12",
      image: "/docs/images/products/iphone-12.png",
      quantity: 1,
      price: "$999",
    },
    {
      name: "iPhone 12",
      image: "/docs/images/products/iphone-12.png",
      quantity: 1,
      price: "$999",
    },
    {
      name: "iPhone 12",
      image: "/docs/images/products/iphone-12.png",
      quantity: 1,
      price: "$999",
    },
    // Add more items as needed
  ];

  // Table headers
  const headers = ["Image", "Product", "Qty in Stock", "Price", "Action"];

  const menuItems = [
    {
      title: "Dashboard",
      link: "/product-manufacturer/dashboard",
      icon: <AiOutlineDashboard />,
    },
    {
      title: "Stock History",
      link: "/product-manufacturer/stock-history",
      icon: <AiOutlineHistory />,
    },
    { title: "Profile", link: "/product-manufacturer/profile", icon: <AiOutlineProfile /> },
    { title: "Settings", link: "/product-manufacturer/settings", icon: <AiOutlineSetting /> },
    { title: "Logout", link: "/logout", icon: <AiOutlineLogin /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar
        logoUrl="/car.ico"
        userName="John Doe"
        userAvatarUrl="/bgImage.jpg"
      />
      <div className="flex flex-grow">
        <Sidebar menuItems={menuItems} />
        <div className="flex-grow p-8">
          <Breadcrumb />
            <Table data={data} headers={headers} />
       
        </div>
      </div>
    </div>
  );
};

export default ProductManufacturerDashboard;
