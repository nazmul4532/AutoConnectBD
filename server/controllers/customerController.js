// CustomerController.js

const Customer = require('../models/customerModel');

const updateCustomerProfile = async (req, res) => {
  try {
    const customerId = req.customer.id; // Assuming the customer ID is stored in the JWT payload
    const { customername, email } = req.body;

    // Fetch the customer from the database
    let customer = await Customer.findById(customerId);

    // Check if the customer exists
    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    // Update customer profile data
    customer.customername = customername || customer.customername; // Update only if provided
    customer.email = email || customer.email; // Update only if provided

    // Save the updated customer profile
    await customer.save();

    res.json({ msg: 'Customer profile updated successfully', customer });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = { updateCustomerProfile };
