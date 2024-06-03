import React from "react";
import profileImage from "../assets/blank_profile.png";

const Navbar = () => {
  return (
    <nav className="bg-red-900 p-3 pl-10 fixed top-0 w-full shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold pr-3">
          <a href="/">AutoConnectBD</a>
        </div>
        <div className="ml-auto space-x-4 flex">
          <a
            href="/product"
            className=" text-gray-300 hover:text-white hover:bg-red-700 hover:shadow px-3 py-2"
          >
            Product
          </a>
          <a
            href="/search"
            className=" text-gray-300 hover:text-white hover:bg-red-700 hover:shadow px-3 py-2"
          >
            Search
          </a>
          <a
            href="/workshop"
            className=" text-gray-300 hover:text-white hover:bg-red-700 hover:shadow px-3 py-2"
          >
            Workshop
          </a>
          <a
            href="/fuelstation"
            className=" text-gray-300 hover:text-white hover:bg-red-700 hover:shadow px-3 py-2"
          >
            FuelStation
          </a>
        </div>
        <div className="ml-4">
          <a href="/dashboard">
            <img
              src={profileImage}
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-slate-800"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
