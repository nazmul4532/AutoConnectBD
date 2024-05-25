import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

// Component imports
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import DashboardPage from "./components/DashboardPage/DashboardPage";
import NotFound from "./components/NotFound"; // Import the custom 404 component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      // Retrieve access token from localStorage
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        try {
          // Send GET request to the server to check if user is logged in
          const response = await fetch("http://localhost:8000/api/user", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignupPage />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <PrivateRoute /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />}
        />
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
