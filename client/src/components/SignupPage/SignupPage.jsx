import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const bgColor = "bg-theme-red";
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!name) {
      toast.error("Name is required");
      return;
    }
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    if (!confirmPassword) {
      toast.error("Confirm Password is required");
      return;
    }
    if (!role) {
      toast.error("Role is required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    // if (!passwordRegex.test(password)) {
    //     toast.error("Password must contain either one uppercase, lowercase, number, or special character.");
    //     return;
    // }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify({ name, email, password, role }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // if (!res.ok) {
      //   console.log("Error signing up");
      //   throw new Error("Error signing up");
      // }

      Swal.fire({
        title: "Account Created Successfully!",
        text: "Please check your email to verify your account",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login"); // Redirect to the login page
        }
      });

      const data = await res.json();
      // console.log(data);
      // toast.success("Successfully signed up");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error signing up");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <div className="absolute inset-0 bg-login-bg bg-cover bg-center z-0"></div>
      <div className="absolute inset-0 bg-theme-gray opacity-80 z-0"></div>
      <ToastContainer />
      <div className="relative lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2 z-10">
        <div className="bg-gray-50 mt-4 shadow-md rounded-lg text-left">
          <div className={`${bgColor} h-2 rounded-t-lg`}></div>
          <h2 className="text-left text-2xl font-bold mt-4 pt-6 px-12">
            Sign Up for a New Account
          </h2>
          <a className="text-left text-sm px-12">Welcome!</a>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 shadow-md rounded-lg pb-12 px-12 pt-6 mb-4"
          >
            <div className="mb-4 relative">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name:
              </label>
              <div className="flex items-center shadow appearance-none border rounded w-full">
                <MdPerson className="absolute ml-3 text-gray-400" size={20} />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="pl-10 p-2 w-full rounded focus:outline-gray-500 focus:outline-2"
                  placeholder="Enter your name"
                />
              </div>
            </div>
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
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password:
              </label>
              <div className="flex items-center shadow appearance-none border rounded w-full">
                <MdLock className="absolute ml-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="pl-10 pr-10 p-2 rounded w-full focus:outline-gray-500 focus:outline-2"
                  placeholder="Enter your password"
                />
                <div className="absolute right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? (
                    <MdVisibilityOff
                      className="text-gray-400 cursor-pointer"
                      size={20}
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <MdVisibility
                      className="text-gray-400 cursor-pointer"
                      size={20}
                      onClick={toggleShowPassword}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password:
              </label>
              <div className="flex items-center shadow appearance-none border rounded w-full">
                <MdLock className="absolute ml-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="pl-10 pr-10 p-2 rounded w-full focus:outline-gray-500 focus:outline-2"
                  placeholder="Confirm your password"
                />
                <div className="absolute right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? (
                    <MdVisibilityOff
                      className="text-gray-400 cursor-pointer"
                      size={20}
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <MdVisibility
                      className="text-gray-400 cursor-pointer"
                      size={20}
                      onClick={toggleShowPassword}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="role"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                User Type:
              </label>
              <div className="flex items-center shadow appearance-none border rounded w-full">
                <MdPerson className="absolute ml-3 text-gray-400" size={20} />
                <select
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                  className="pl-10 p-2 w-full rounded focus:outline-gray-500 focus:outline-2"
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="customer">Car Owner</option>
                  <option value="workshop">Car Workshop</option>
                  <option value="company">Product Manufacturer</option>
                  <option value="fuelstation">Fueling Station</option>
                </select>
              </div>
            </div>
            <div className="pt-6">
              <button
                type="submit"
                className={`${bgColor} hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full`}
              >
                Sign Up
              </button>
              <div className="text-center p-3">
                <a
                  href="/login"
                  className="text-sm text-gray-600 hover:underline hover:text-gray-950"
                >
                  Already have an account?{" "}
                  <span className={`font-bold`}>Log in here!</span>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;