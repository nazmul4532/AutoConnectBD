import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

// component imports
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage/ResetPasswordPage";
import NotFound from "./components/NotFound"; 
import CompanyDashboard from "./components/CompanyDashboard/CompanyDashboard";
import LogOutPage from "./components/Logout/LogoutPage";
import LandingPage from "./components/LandingPage/LandingPage";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import OrderManagementPage from "./components/OrderManagementPage/OrderManagementPage";
import OrderHistoryPage from "./components/OrderHistoryPage/OrderHistoryPage";
import Home from "./components/Home/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const checkLoggedIn = async () => {
      // Retrieve access token from localStorage
      const accessToken = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");

      if(user){
        setRole(JSON.parse(user).role);
        console.log(role);
      }

      if (accessToken) {
        try {
          // Send GET request to the server to check if user is logged in
          const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/user`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
          });
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn);
        } catch (error) {
          console.error("Error checking if user is logged in:", error);
        }
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to={`/${role}/dashboard`} /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to={`/${role}/dashboard`} /> : <SignupPage />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <LandingPage /> : <Navigate to="/login" />}
        />
          <Route
          path="/logout"
          element={<LogOutPage/>}
        />
   
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/customer/dashboard"
          element={ isLoggedIn && role === "customer" ? <ProductsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/company/dashboard"
          element={ isLoggedIn && role === "company" ? <CompanyDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/landingPage" element={<LandingPage/>} />
        <Route path="/customer/products" element={<ProductsPage/>} />
        <Route path="/customer/checkout" element={<CheckoutPage/>} />
        <Route path="/customer/order-history" element={<OrderHistoryPage/>} />
        <Route path="/company/order-management" element={<OrderManagementPage/>} />
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const PrivateRoute = () => {
  // Render private route component here
  return <div>Private Route Component</div>;
};

export default App;
