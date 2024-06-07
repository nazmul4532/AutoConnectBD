import React from "react";

const PaymentStep = ({ formData, handleChange, handleDateChange }) => {
  const handleCheckboxChange = () => {
    handleChange({
      target: {
        name: "cashOnDelivery",
        value: !formData.cashOnDelivery,
      },
    });
  };

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    // Remove non-digit characters
    const newValue = value.replace(/\D/g, "");
    // Format the value with spaces after every 4 characters
    const formattedValue = newValue.replace(/(\d{4})/g, "$1 ");
    // Limit the length to 16 characters
    const limitedValue = formattedValue.substring(0, 19);
    // Update the form data
    handleChange({
      target: {
        name: "cardNumber",
        value: limitedValue,
      },
    });
  };

  return (
    <div>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="cardName"
            className={`block mb-2 text-sm font-medium ${
              formData.cashOnDelivery ? "text-gray-500" : "text-gray-900"
            }`}
          >
            Name on Card
          </label>
          <input
            type="text"
            name="cardName"
            id="cardName"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
              formData.cashOnDelivery ? "cursor-not-allowed bg-gray-200" : ""
            }`}
            value={formData.cardName}
            onChange={handleChange}
            required
            disabled={formData.cashOnDelivery}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="cardNumber"
            className={`block mb-2 text-sm font-medium ${
              formData.cashOnDelivery ? "text-gray-500" : "text-gray-900"
            }`}
          >
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            id="cardNumber"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
              formData.cashOnDelivery ? "cursor-not-allowed bg-gray-200" : ""
            }`}
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            required
            disabled={formData.cashOnDelivery}
          />
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="cvc"
            className={`block mb-2 text-sm font-medium ${
              formData.cashOnDelivery ? "text-gray-500" : "text-gray-900"
            }`}
          >
            CVC
          </label>
          <input
            type="text"
            name="cvc"
            id="cvc"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
              formData.cashOnDelivery ? "cursor-not-allowed bg-gray-200" : ""
            }`}
            value={formData.cvc}
            onChange={handleChange}
            required
            disabled={formData.cashOnDelivery}
          />
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="expiryDate"
            className={`block mb-2 text-sm font-medium ${
              formData.cashOnDelivery ? "text-gray-500" : "text-gray-900"
            }`}
          >
            Expiry Date
          </label>
          <input
            type="date" // Use type="date" for the input
            id="expiryDate"
            name="expiryDate"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
              formData.cashOnDelivery ? "cursor-not-allowed bg-gray-200" : ""
            }`}
            value={formData.expiryDate} // Use formData to populate the value
            onChange={handleChange} // Use handleChange for input changes
            required
            disabled={formData.cashOnDelivery}
          />
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="cardType"
            className={`block mb-2 text-sm font-medium ${
              formData.cashOnDelivery ? "text-gray-500" : "text-gray-900"
            }`}
          >
            Card Type
          </label>
          <select
            name="cardType"
            id="cardType"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
              formData.cashOnDelivery ? "cursor-not-allowed bg-gray-200" : ""
            }`}
            value={formData.cardType}
            onChange={handleChange}
            required
            disabled={formData.cashOnDelivery}
          >
            <option value="" disabled>
              Select card type
            </option>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="cardNetwork"
            className={`block mb-2 text-sm font-medium ${
              formData.cashOnDelivery ? "text-gray-500" : "text-gray-900"
            }`}
          >
            Card Network
          </label>
          <select
            name="cardNetwork"
            id="cardNetwork"
            className={`bg-gray-50 border border-gray
            -300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
              formData.cashOnDelivery ? "cursor-not-allowed bg-gray-200" : ""
            }`}
            value={formData.cardNetwork}
            onChange={handleChange}
            required
            disabled={formData.cashOnDelivery}
          >
            <option value="" disabled>
              Select card network
            </option>
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
          </select>
        </div>
        {/* Checkbox for Cash on Delivery */}
        <div className="sm:col-span-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-900"
              onChange={handleCheckboxChange}
              checked={formData.cashOnDelivery}
              name="cashOnDelivery"
            />
            <span
              className={`ml-2 text-sm ${
                formData.cashOnDelivery ? "text-gray-500" : "text-gray-900"
              }`}
            >
              Cash on Delivery
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
