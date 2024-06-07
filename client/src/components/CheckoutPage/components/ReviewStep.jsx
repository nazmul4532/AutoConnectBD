import React from "react";

const ReviewStep = ({ formData }) => {
  return (
    <div>
      {/* Shipping Details */}
      <div className="border rounded-lg p-4 mb-4">
        <h4 className="text-lg font-medium text-theme-red font-extrabold">
          Shipping Information
        </h4>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>First Name:</strong> {formData.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {formData.lastName}
        </p>
        <p>
          <strong>Address:</strong> {formData.address}
        </p>
        <p>
          <strong>Country:</strong> {formData.country}
        </p>
        <p>
          <strong>State:</strong> {formData.state}
        </p>
        <p>
          <strong>City:</strong> {formData.city}
        </p>
        <p>
          <strong>Postal Code:</strong> {formData.postalCode}
        </p>
        <p>
          <strong>Phone Number:</strong> {formData.phoneNumber}
        </p>
      </div>
      {/* Payment Details */}
      <div className="border rounded-lg p-4 mb-4">
        <h4 className="text-lg font-medium text-theme-red font-extrabold">
          Payment Information
        </h4>
        {formData.cashOnDelivery ? (
          <p>
            {" "}
            <strong>Cash on Delivery</strong>
          </p>
        ) : (
          <>
            <p>
              <strong>Name on Card:</strong> {formData.cardName}
            </p>
            <p>
              <strong>Card Number:</strong>{" "}
              {formData.cardNumber.replace(
                /\d{12}(\d{4})/,
                "**** **** **** $1"
              )}
            </p>
            <p>
              <strong>CVC:</strong> {formData.cvc}
            </p>
            <p>
              <strong>Expiry Date:</strong> {formData.expiryDate}
            </p>
            <p>
              <strong>Card Type:</strong> {formData.cardType}
            </p>
            <p>
              <strong>Card Network:</strong> {formData.cardNetwork}
            </p>
          </>
        )}
      </div>
      {/* Order Summary */}
      <div className="border rounded-lg p-4">
        <h4 className="text-lg font-medium text-theme-red font-extrabold">
          Order Information
        </h4>
        {/* Add order summary details here */}
      </div>
    </div>
  );
};

export default ReviewStep;
