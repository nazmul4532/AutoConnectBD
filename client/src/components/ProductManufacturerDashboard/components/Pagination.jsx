import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem - 1 + itemsPerPage, totalItems);

  return (
    <div className="flex flex-col items-center p-5">
      <span className="text-sm text-gray-700">
        Showing{" "}
        <span className="font-semibold text-gray-900">
          {startItem} to {endItem}
        </span>{" "}
        of <span className="font-semibold text-gray-900">{totalItems}</span>{" "}
        Entries
      </span>
      <div className="flex mt-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 text-sm font-medium rounded-l-md ${
            currentPage === 1
              ? "text-gray-500 cursor-not-allowed bg-gray-200"
              : "text-gray-900 hover:text-gray-600 bg-gray-300 hover:bg-gray-400"
          }`}
        >
          Prev
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 ml-2 text-sm font-medium rounded-r-md ${
            currentPage === totalPages
              ? "text-gray-500 cursor-not-allowed bg-gray-200"
              : "text-gray-900 hover:text-gray-600 bg-gray-300 hover:bg-gray-400"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
