import { MdAdd, MdRemove } from "react-icons/md";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import QuantityModal from "./QuantityModal";

const Table = ({ api, data, headers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [action, setAction] = useState("increase");
  const [items, setItems] = useState(data); // State to hold the items with updated quantities
  const itemsPerPage = 5; // Define the number of items per page
  const [pagination, setPagination] = useState({}); // State to hold the pagination data

  // Pagination logic
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = pagination.totalPages || 1;
  const totalProducts = pagination.totalProducts || 0;

  // Pagination data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);
  const paginatedData = items.slice(startIndex, endIndex);
  const accessToken = localStorage.getItem("accessToken");

  const handleIncreaseClick = (item) => {
    setSelectedItem(item);
    setAction("increase");
    setIsModalOpen(true);
  };

  const handleDecreaseClick = (item) => {
    setSelectedItem(item);
    setAction("decrease");
    setIsModalOpen(true);
  };

  const handleConfirmChange = (quantity) => {
    if (!selectedItem || !quantity || quantity <= 0) {
      return;
    }

    if (action === "increase") {
      quantity = parseInt(quantity, 10);
    } else {
      quantity = -parseInt(quantity, 10);
    }

    setIsModalOpen(false);
  };

  
    //----------Write backend api integration code here------------//
    const getProductData = async () => {
      try {
        // window.alert("I fired");
        console.log("Fetching Products");
        console.log(currentPage);
        const res = await fetch(`${api}?page=${currentPage}&pageSize=${itemsPerPage}`,{
            headers: {
              Authorization: `Bearer ${JSON.parse(accessToken)}`,
            },
          });

        if (!res.ok) {
          throw new Error("Error fetching products");
        }

        const { products, pagination } = await res.json();

        setItems(products);
        setPagination(pagination);
        console.log("Products:", products);
        console.log("Pagination:", pagination);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Server Error");
      }
    };
    useEffect(() => {
      getProductData();
    }, [currentPage, itemsPerPage, api, accessToken]);

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg ml-64 mt-20 p-15 rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-white uppercase bg-theme-black">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-lg text-center"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className={`border-b hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-theme-blue bg-opacity-15" : "bg-white"
              }`}
            >
              <td className="p-4 text-center">
                <img
                  src={item.image}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt={item.name}
                />
              </td>
              <td className="px-6 py-4 font-semibold text-center">
                <span className="text-black">{item.name}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center">
                  <button
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none"
                    type="button"
                    onClick={() => handleDecreaseClick(item)}
                  >
                    <span className="sr-only">Decrease Quantity</span>
                    <MdRemove />
                  </button>
                  <input
                    type="number"
                    className="bg-gray-50 w-14 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 text-center"
                    value={item.quantity}
                    disabled
                  />
                  <button
                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none"
                    type="button"
                    onClick={() => handleIncreaseClick(item)}
                  >
                    <span className="sr-only">Increase Quantity</span>
                    <MdAdd />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-center">
                <span className="text-black">{item.price}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <span className="mx-2">|</span>
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:underline"
                  >
                    Remove
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        itemsPerPage={itemsPerPage}
        totalItems={totalProducts}
      />
      <QuantityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmChange}
        itemQuantity={selectedItem?.quantity}
        action={action}
      />
    </div>
  );
};

export default Table;
