import React from "react";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const links = [
    { title: "Home", url: "/home" },
    { title: "Cars", url: "/cars" },
    { title: "About", url: "/about" },
    { title: "Why Us", url: "/why-us" },
    { title: "Testimonials", url: "/testimonials" },
    { title: "Contact", url: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar logoUrl="/car.ico" links={links} />
      <HeroSection />
    </div>
  );
};

export default LandingPage;
