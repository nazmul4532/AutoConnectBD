import React, { useState } from "react";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal"; // Import the ConfirmationModal component
import DetailsModal from "./DetailsModal"; // Import the DetailsModal component

const Table = ({ api, data, headers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState(data);
  const [pagination, setPagination] = useState({});
  const [orders, setOrders] = useState([
    {
      _id: "6662e75f9a3d24dcdb044433",
      customerName: "Nazmul Hossain",
      date: "2021-09-01",
      totalPrice: 150.75,
      orderStatus: "Pending",
      orderList: [
        {
          productId: "101",
          productName: "Product 1",
          quantity: 2,
          unitPrice: 25.5,
        },
        {
          productId: "102",
          productName: "Product 2",
          quantity: 1,
          unitPrice: 50.25,
        },
      ],
    },
    // Other orders...
  ]);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State for modal visibility
  const [selectedOrderId, setSelectedOrderId] = useState(""); // State to store the selected order ID for confirmation
  const [selectedStatus, setSelectedStatus] = useState(""); // State to store the selected status

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State for details modal visibility
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null); // State to store the selected order details

  const itemsPerPage = 5;
  const totalPages = pagination.totalPages || 1;
  const totalProducts = pagination.totalProducts || 0;
  const accessToken = localStorage.getItem("accessToken");

  const statusOptions = [
    {
      value: "Pending",
      label: "Pending",
      colorClass: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "Shipped",
      label: "Shipped",
      colorClass: "bg-blue-100 text-blue-800",
    },
    {
      value: "Delivered",
      label: "Delivered",
      colorClass: "bg-green-100 text-green-800",
    },
    {
      value: "Canceled",
      label: "Canceled",
      colorClass: "bg-red-100 text-red-800",
    },
    {
      value: "Processing",
      label: "Processing",
      colorClass: "bg-purple-100 text-purple-800",
    },
  ];

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedOrderId(orderId);
    setSelectedStatus(newStatus); // Set the selected status
    setIsConfirmationOpen(true);
  };

  const confirmStatusChange = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === selectedOrderId
          ? { ...order, orderStatus: selectedStatus } // Use selectedStatus
          : order
      )
    );
    toast.success(`Status updated successfully`);
    setIsConfirmationOpen(false); // Close the confirmation modal
  };

  const handleSeeMoreClick = (order) => {
    setSelectedOrderDetails(order);
    setIsDetailsModalOpen(true);
  };

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
          {orders.map((item, index) => (
            <tr
              key={item._id}
              className={`border-b hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-theme-blue bg-opacity-15" : "bg-white"
              }`}
            >
              <td className="px-6 py-4 font-extrabold text-center">
                <span className="text-black">{item._id}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-black">{item.date}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <div
                  className={`block w-full bg-white px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${
                    statusOptions.find(
                      (status) => status.value === item.orderStatus
                    )?.colorClass
                  }`}
                >
                  {item.orderStatus}
                </div>
              </td>

              <td className="px-6 py-4 font-extrabold text-center">
                <span className="text-black">BDT {item.totalPrice}</span>
              </td>

              <td className="px-6 py-4 text-center">
                <div className="flex justify-center">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleSeeMoreClick(item)} // Open details modal on click
                  >
                    See More
                  </button>
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
      {/* ConfirmationModal */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={confirmStatusChange}
      />
      {/* DetailsModal */}
      {isDetailsModalOpen && (
        <DetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          order={selectedOrderDetails}
        />
      )}
    </div>
  );
};

export default Table;
