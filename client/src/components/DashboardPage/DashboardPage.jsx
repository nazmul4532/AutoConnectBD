import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
      });
      const data = await response.json();
      setUserData(data.user);
    };

    fetchUserData();
  }, []);

  if (!userData) {
    if (!localStorage.getItem("accessToken")) {
      navigate("/");
    } else {
      return <div>Loading...</div>;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
    // Commented Out to Keep things consistent
    // Swal.fire({
    //   title: "Logout Sucessful",
    //   // text: "Please check your email to verify your account",
    //   icon: "success",
    //   confirmButtonText: "OK",
    // }).then((result) => {
    //   window.location.reload();
    // });
    
  };

  return (
    <div className="min-h-screen flex flex-col mt-16">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-1/4 bg-red-600 text-white p-4">
          <ul>
            <li className="mb-4">
              <button className="w-full text-left">Edit Profile</button>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full text-left">
                Logout
              </button>
            </li>
          </ul>
        </aside>
        <main className="w-3/4 p-8 bg-slate-50 text-slate-900">
          <div className="flex items-center justify-center mb-8">
            <div className="w-32 h-32 bg-red-300 rounded-full flex items-center justify-center text-4xl text-white">
              {userData.name.charAt(0)}
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{userData.name}</h1>
            <p className="text-lg mb-2">{userData.email}</p>
            <p className="text-lg mb-2">{userData.role}</p>
            <p className="text-lg">{userData.description}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
