import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-red-700 p-8 rounded-lg text-white text-center">
        <h1 className="text-3xl font-bold mb-4">404 Page Not Found</h1>
        <p className="text-xl">
          The page you're looking for doesn't seem to exist.
        </p>
        <p className="text-sm pb-10 pt-5">
          Hmm... where did you take a wrong turn?
        </p>
        <Link to="/" className="text-sm mt-4 block">
          Take me home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
