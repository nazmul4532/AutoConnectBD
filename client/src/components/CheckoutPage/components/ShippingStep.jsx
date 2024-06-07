import React, { useState, useEffect } from "react";
import countryJSON from "../../../assets/countries+states+cities.json";

const ShippingStep = ({ formData, handleChange }) => {
  const countryDB = countryJSON;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedPrefix, setSelectedPrefix] = useState("+XX");

  useEffect(() => {
    formData.country = selectedCountry;
    formData.state = selectedState;
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    const country = countryDB.find(
      (country) => country.name === selectedCountry
    );

    if (country) {
      setStates(country.states || []);
      setSelectedState("");
      setCities([]);
    } else {
      setStates([]);
      setSelectedState("");
      setCities([]);
    }

    handleChange({ target: { name: "state", value: "" } });
    handleChange({ target: { name: "city", value: "" } });
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    const state = states.find((state) => state.name === selectedState);

    if (state) {
      if (state.cities.length > 0) {
        setCities(state.cities);
      } else {
        setCities([state]);
      }
    } else {
      setCities([state]);
    }

    console.log(cities);

    handleChange({ target: { name: "city", value: "" } });
  };

  const handlePrefixChange = (event) => {
    setSelectedPrefix(event.target.value);
  };

  return (
    <div>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {/* Email Address */}
        <div className="col-span-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        {/* Address */}
        <div className="col-span-2">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        {/* Country and State */}
        <div className="grid grid-cols-2 gap-4 col-span-2">
          <div>
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Country
            </label>
            <select
              name="country"
              id="country"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={selectedCountry}
              onChange={handleCountryChange}
              required
            >
              <option value="" disabled>
                Select a country
              </option>
              {countryDB.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="state"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              State
            </label>
            <select
              name="state"
              id="state"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={selectedState}
              onChange={handleStateChange}
              required
            >
              <option value="" disabled>
                Select a state
              </option>
              {states.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* City and Postal Code */}
        <div className="grid grid-cols-2 gap-4 col-span-2">
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              City
            </label>
            <select
              name="city"
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a city
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="postalCode"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      {/* Phone Number */}
      <div className="col-span-2 relative">
        <label
          htmlFor="phoneNumber"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Phone Number
        </label>
        {/* Prefix for Phone Number */}
        <div className="relative">
          <select
            name="phonePrefix"
            id="phonePrefix"
            className="absolute inset-y-0 left-0 flex items-center pl-3 pr-3 text-gray-500 bg-gray-50 border border-gray-300 text-sm rounded-l-lg"
            value={selectedPrefix}
            onChange={handlePrefixChange}
          >
            {countryDB.map((country) => (
              <option key={country.id} value={`+${country.phone_code}`}>
                {`${country.emoji} +${country.phone_code}`}
              </option>
            ))}
          </select>

          {/* Phone Number Input Field */}
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-[15rem] pr-3 py-3"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingStep;
