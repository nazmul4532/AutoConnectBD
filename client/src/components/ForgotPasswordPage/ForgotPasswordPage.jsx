import React, { useState, useEffect } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const bgColor = "bg-theme-red";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/auth/request-reset-password`,
        {
          method: "POST",
          body: JSON.stringify({ email}),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        title: "Forgotten password request sent successfully!",
        text: "Please check your email to verify your account.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login"); // Redirect to the login page
        }
      });
      const data = await res.json();
      console.log(data);

    } catch (error) {
      console.error("Error:", error);
      toast.error("Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <ToastContainer />
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <div className="mt-4 shadow-md rounded-lg text-left">
          <div className={`${bgColor} h-2 rounded-t-lg`}></div>
          <h2 className="text-left text-2xl font-bold mt-4 pt-6 px-12">
            Forgot Password Form
          </h2>
          <a className="text-left text-sm px-12">Please enter the email linked to your account!</a>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 shadow-md rounded-lg pb-12 px-12 pt-6 mb-4"
          >
            <div className="mb-4 relative">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email:
              </label>
              <div className="flex items-center shadow appearance-none border rounded w-full">
                <MdEmail className="absolute ml-3 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="pl-10 p-2 w-full rounded focus:outline-gray-500 focus:outline-2"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="text-center p-3">
                <a
                  href="/login"
                  className="text-sm text-gray-600 hover:underline hover:text-gray-950"
                >
                  Remembered Your Password?{" "}
                  <span className={`font-bold`}>Log in here!</span>
                </a>
              </div>
            <div className="pt-6">
              <button
                type="submit"
                className={`${bgColor} hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
