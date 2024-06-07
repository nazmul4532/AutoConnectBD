import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal"; // Import the ConfirmationModal component
import DetailsModal from "./DetailsModal"; // Import the DetailsModal component

const Table = ({ api, data, headers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState(data);
  const [pagination, setPagination] = useState({});
  const itemsPerPage = 5;
  const accessToken = localStorage.getItem("accessToken");
  const [orders, setOrders] = useState([
    {
      _id: "1",
      customerName: "John Doe",
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
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${api}/user-orders?page=${currentPage}&limit=${itemsPerPage}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
      });
      if (!res.ok) {
        throw new Error("Error fetching orders");
      }
      const { orders, pagination } = await res.json();
      setOrders(orders);
      setPagination(pagination);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
    let formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("status", newStatus);
    const res = await fetch(`${api}/update-order-status`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      throw new Error("Error updating order status");
    }
    const { orders, pagination } = await res.json();
    setOrders(orders);
    setPagination(pagination);
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error("Error fetching orders");
  }
  }

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State for modal visibility
  const [selectedOrderId, setSelectedOrderId] = useState(""); // State to store the selected order ID for confirmation
  const [selectedStatus, setSelectedStatus] = useState(""); // State to store the selected status

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State for details modal visibility
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null); // State to store the selected order details

  const totalPages = pagination.totalPages || 1;
  const totalProducts = pagination.totalProducts || 0;

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

    //give api here
    console.log(selectedOrderId, selectedStatus);
    updateStatus(selectedOrderId, selectedStatus);


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
                <span className="text-black">{item.firstName +" "+item.lastName}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="relative inline-block">
                  <select
                    value={item.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(item._id, e.target.value)
                    }
                    className={`block appearance-none w-full bg-white hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${
                      statusOptions.find(
                        (status) => status.value === item.orderStatus
                      )?.colorClass
                    }`}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
