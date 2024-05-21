import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

// component imports
import LoginPage from "./components/LoginPage/LoginPage";

console.log(import.meta.env.VITE_APP_API_URL);
console.log(import.meta.env.VITE_APP_BASE_URL);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
