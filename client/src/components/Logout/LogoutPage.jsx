import React, { useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";



const LogOutPage = () => {
    
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  useEffect(() => {
    handleLogout();
  }, []);

  

  return ( 
    <div>
    </div>
  );
};

export default LogOutPage;
