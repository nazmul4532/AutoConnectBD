import React from "react";

const NavBar = ({ logoUrl, links }) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-theme-black border-none">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <a href="/landingPage" className="flex ms-2 md:me-24 p-3">
              <img src={logoUrl} className="h-8 me-3" alt="Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                AutoConnectBD
              </span>
            </a>
          </div>
          <div className="flex items-center">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-white px-4 py-2 mx-1 hover:text-theme-red hover:underline"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
