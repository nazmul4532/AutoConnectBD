import React from "react";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
  AiOutlineSetting,
  AiOutlineLogin,
  AiOutlineProfile,
  AiOutlineHistory,
} from "react-icons/ai";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";
import NavigationBar from "./components/NavBar";
import Breadcrumb from "./components/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let data = null;

const ProductManufacturerDashboard = () => {
  // Sample JSON data
  data = [
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

  //----------Write backend api integration code here------------//
  // useEffect(() => {
  //   const getProductData = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const res = await fetch(
  //         `${import.meta.env.VITE_APP_API_URL}/api/auth/signin`,
  //         {
  //           method: "POST",
  //           body: JSON.stringify({ email, password }),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       data = await res.json();
  //       console.log(data);
  //       if (!res.ok) {
  //         if ((data.msg = "Invalid Credentials")) {
  //           toast.error(data.msg);
  //         } else {
  //           throw new Error("Error logging in");
  //         }
  //       } else {
  //         //
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       toast.error("Server Error");
  //     }
  //   };
  //   getProductData();
  // }, []);

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
    {
      title: "Profile",
      link: "/product-manufacturer/profile",
      icon: <AiOutlineProfile />,
    },
    {
      title: "Settings",
      link: "/product-manufacturer/settings",
      icon: <AiOutlineSetting />,
    },
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
