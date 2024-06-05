import React from "react";

const HeroSection = () => {
  return (
    <div className="relative h-screen flex items-center justify-between bg-theme-white px-8 md:px-16">
      <div className="relative z-10 text-theme-black text-left w-1/2 p-8 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-theme-red">AutoConnectBD</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Your one-stop destination for all your automotive needs
        </p>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Get Started
        </button>
      </div>
      <div className="relative w-1/2 h-full z-0 flex justify-center items-center animate-fadeIn">
        <img
          className="w-3/4 h-3/4 object-contain"
          src="/car.png"
          alt="Background"
        />
      </div>
    </div>
  );
};

export default HeroSection;
