import React, { useState } from "react";
import {
  AiOutlinePlusCircle,
  AiOutlineDashboard,
  AiOutlineHistory,
  AiOutlineProfile,
  AiOutlineSetting,
  AiOutlineLogin,
} from "react-icons/ai";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";
import NavigationBar from "./components/NavBar";
import Breadcrumb from "./components/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProductModal from "./components/AddProductModal";

const CompanyDashboard = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.name);

  const handleAddProductClick = () => {
    setIsAddProductModalOpen(true);
  };

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
          ]}
        />
        <div className="flex-grow p-8">
          <Breadcrumb />
          <div className="flex items-center justify-center w-100 mb-8 ml-64 mt-20 p-15">
            <button
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              onClick={handleAddProductClick}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <AiOutlinePlusCircle className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm font-semibold text-gray-500">
                  Click to add product
                </p>
              </div>
            </button>
          </div>
          <Table
            api={`${import.meta.env.VITE_APP_API_URL}/api/product`}
            data={[]}
            headers={["Image", "Product", "Qty in Stock", "Price", "Action"]}
          />
          <AddProductModal
            isOpen={isAddProductModalOpen}
            onClose={() => setIsAddProductModalOpen(false)}
            onConfirm={async (productDetails) => {
              // Handle adding the product details here
              const formData = new FormData();
              const accessToken = localStorage.getItem("accessToken");
              console.log("Product added:", productDetails);
              formData.append('name', productDetails.name);
              formData.append('unitPrice', productDetails.price);
              formData.append('quantity', productDetails.quantity);
              formData.append('image', productDetails.image);
              formData.append('categories', productDetails.categories);
              // for (let i = 0; i < productDetails.images.length; i++) {
              //   formData.append('images', productDetails.images[i]);
              // }
              const res = await fetch(
                `${import.meta.env.VITE_APP_API_URL}/api/product/add`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${JSON.parse(accessToken)}`,
                  },
                  body: formData,
                }
              );
              if (!res.ok) {
                throw new Error("Error fetching products");
              }
              console.log("Product added:", productDetails);
              setIsAddProductModalOpen(false);
              window.location.reload();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
