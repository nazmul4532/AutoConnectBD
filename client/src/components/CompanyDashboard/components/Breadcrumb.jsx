import React from "react";
import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Split the pathname into parts and create breadcrumb items
  const pathnames = pathname.split("/").filter((x) => x);
  const breadcrumbItems = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;
    return { label: value.replace(/-/g, " "), href: to, current: isLast };
  });

  return (
    <nav
      className="flex text-theme-black ml-64 mt-20 p-15"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <span className="inline-flex items-center text-sm font-medium text-gray-700">
            <svg
              className="w-3 h-3 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M19.707 9.293l-2-2-7-7a1 1 0 00-1.414 0l-7 7-2 2a1 1 0 001.414 1.414L2 10.414V18a2 2 0 002 2h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a2 2 0 002-2v-7.586l.293.293a1 1 0 001.414-1.414z" />
            </svg>
            home
          </span>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={index} aria-current={item.current ? "page" : undefined}>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 9l4-4-4-4"
                />
              </svg>
              {item.current ? (
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                >
                  {item.label}
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
