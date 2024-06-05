import React from "react";
import { useLocation } from "react-router-dom";

const Sidebar = ({ menuItems }) => {
  const location = useLocation();

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 bg-black"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto pt-5 bg-black">
        <div>
          <ul className="space-y-2 font-medium">
            {menuItems.map((menuItem, index) => {
              const isActive = location.pathname === menuItem.link;

              return (
                <div key={index}>
                  <li>
                    <a
                      href={menuItem.link}
                      className={`flex p-5 items-center w-full text-white hover:bg-theme-blue group ${
                        isActive ? "bg-theme-blue" : ""
                      }`}
                    >
                      {menuItem.icon}
                      <span className="pl-4">{menuItem.title}</span>
                    </a>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
