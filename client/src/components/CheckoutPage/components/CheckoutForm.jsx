import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import ShippingStep from "./ShippingStep";
import PaymentStep from "./PaymentStep";
import ReviewStep from "./ReviewStep";

const CheckoutForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const steps = ["Shipping", "Payment", "Review"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="mt-16 bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <ol className="flex items-center mb-4 sm:mb-5">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`flex items-center ${
                index < currentStep ? "text-blue-600" : "text-gray-600"
              } ${
                index < steps.length - 1
                  ? "w-full after:content-[''] after:w-full after:h-1 after:border-b after:border-" +
                    (index <= currentStep ? "blue" : "gray") +
                    "-100 after:border-4 after:inline-block"
                  : ""
              }`}
            >
              <div
                className={`flex flex-col items-center justify-center w-10 h-10 ${
                  index <= currentStep ? "bg-blue-100" : "bg-gray-100"
                } rounded-full lg:h-12 lg:w-12`}
              >
                <span
                  className={`mt-9 font-bold ${
                    index < currentStep ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`mt-5 text-sm font-bold ${
                    index < currentStep ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {step}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <form className="pt-8">
          {currentStep === 0 && (
            <ShippingStep formData={formData} handleChange={handleChange} />
          )}
          {currentStep === 1 && (
            <PaymentStep formData={formData} handleChange={handleChange} />
          )}
          {currentStep === 2 && <ReviewStep formData={formData} />}
          <div className="flex justify-between mt-4">
            {currentStep > 0 && (
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={handlePrev}
              >
                Previous
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit} 
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckoutForm;
