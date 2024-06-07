import React, { useState } from "react";
import {
  AiOutlinePlusCircle,
  AiOutlineDashboard,
  AiOutlineHistory,
  AiOutlineProfile,
  AiOutlineSetting,
  AiOutlineLogin,
  AiOutlineOrderedList,
} from "react-icons/ai";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";
import NavigationBar from "./components/NavBar";
import Breadcrumb from "./components/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderManagmentPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.name);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar
        logoUrl="/car.ico"
        userName={user.name}
        userAvatarUrl="/bgImage.jpg"
      />
      <div className="flex flex-grow">
        <Sidebar
          menuItems={[
            {
              title: "Dashboard",
              link: "/company/dashboard",
              icon: <AiOutlineDashboard />,
            },
            {
              title: "Order Management",
              link: "/company/order-management",
              icon: <AiOutlineOrderedList />,
            },
            // {
            //   title: "Stock History",
            //   link: "/company/stock-history",
            //   icon: <AiOutlineHistory />,
            // },
            {
              title: "Profile",
              link: "/company/profile",
              icon: <AiOutlineProfile />,
            },
            {
              title: "Settings",
              link: "/company/settings",
              icon: <AiOutlineSetting />,
            },
            { title: "Logout", link: "/logout", icon: <AiOutlineLogin /> },
          ]}
        />
        <div className="flex-grow p-8">
          <Breadcrumb />
          <Table
            api={`${import.meta.env.VITE_APP_API_URL}/api/product`}
            data={[]}
            headers={["Order ID", "Customer", "Status", "Total", "Details",]}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderManagmentPage;
