import React from 'react';
import NavBar from '../LandingPage/components/NavBar';

const Home = ({ userType }) => {
  // Content based on user type
  let content;
  switch (userType) {
    case 'visitor':
      content = (
        <div className="container mx-auto mt-8">
          <h1 className="text-4xl font-bold text-center mb-4">Welcome to AutoConnectBd!</h1>
          <p className="text-lg text-center">Sign up now to connect with car enthusiasts!</p>
        </div>
      );
      break;
    case 'user':
      content = (
        <div className="container mx-auto mt-8">
          <h1 className="text-4xl font-bold text-center mb-4">Welcome back!</h1>
          <p className="text-lg text-center">Check out the latest car listings and connect with other users.</p>
        </div>
      );
      break;
    case 'admin':
      content = (
        <div className="container mx-auto mt-8">
          <h1 className="text-4xl font-bold text-center mb-4">Admin Dashboard</h1>
          <p className="text-lg text-center">Manage users, listings, and site settings here.</p>
        </div>
      );
      break;
    default:
      content = (
        <div className="container mx-auto mt-8">
          <h1 className="text-4xl font-bold text-center mb-4">Welcome to AutoConnectBd!</h1>
          <p className="text-lg text-center">Sign up now to connect with car enthusiasts!</p>
        </div>
      );
  }

  return (
    <div>
      <NavBar />
      {/* Main Content */}
      {content}
    </div>
  );
};

export default Home;
