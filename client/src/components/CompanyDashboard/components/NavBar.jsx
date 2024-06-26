import React from "react";

const NavBar = ({ logoUrl, userAvatarUrl, userName }) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-theme-black border-none">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <a
              href="/product-manufacturer/dashboard"
              className="flex ms-2 md:me-24 p-3"
            >
              <img src={logoUrl} className="h-8 me-3" alt="Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                AutoConnectBD
              </span>
            </a>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm rounded-md justify-center items-center"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={userAvatarUrl}
                    alt="user photo"
                  />
                  <span className="pl-5 ml-2 text-base font-semibold text-white">
                    {userName}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
