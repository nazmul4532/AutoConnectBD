const Workshop = require('../models/workshopModel');

const updateWorkshopProfile = async (req, res) => {
  try {
    const workshopId = req.workshop.id; // Assuming the workshop ID is stored in the JWT payload
    const { workshopname, email } = req.body;

    // Fetch the workshop from the database
    let workshop = await Workshop.findById(workshopId);

    // Check if the workshop exists
    if (!workshop) {
      return res.status(404).json({ msg: 'workshop not faound' });
    }

    // Update workshop profile data
    workshop.workshopname = workshopname || workshop.workshopname; // Update only if provided
    workshop.email = email || workshop.email; // Update only if provided

    // Save the updated workshop profile
    await workshop.save();

    res.json({ msg: 'workshop profile updated successfully', workshop });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getHello = async (req, res) => {
  try {
    res.status(200).json({
      msg: 'Hello from the workshop controller',
      email: req.user.email,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};


module.exports = { getHello, updateWorkshopProfile };
