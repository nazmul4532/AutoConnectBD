const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

// Cool New Security Feature: Express Validator
// const { validationResult } = require('express-validator');

// Add an appointment
exports.addAppointment = async (req, res) => {
  try {
    const { workshop, date, timeSlot, appointmentType } = req.body;
    const appointment = new Appointment({
      customer: req.user._id,
      workshop,
      date,
      timeSlot,
      appointmentType,
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const reqUser = req.user._id;
    const { date, timeSlot, status } = req.body;
    const appointmentId = req.params.appointmentId;

    console.log(appointmentId);
    console.log(workshopId);

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment || (appointment.workshop != reqUser && appointment.customer != reqUser)) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (date) appointment.date = date;
    if (timeSlot) appointment.timeSlot = timeSlot;
    if (status) appointment.status = status;
    await appointment.save();
    res.status(200).json({ message: "Appointment updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getWorkshopBusySlots = async (req, res) => {
  try {
    const workshopId = req.params.workshopId;
    const projection = {_id: 0, timeSlots: 1, date: 1,}
    const busySlots = Appointment.find({workshop: workshopId, status: "confirmed"}).project(projection).toArray();
    //This needs to be checked for bugs
    console.log(busySlots);
    res.status(201).json(busySlots);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
    try {
      const appointmentId = req.params.appointmentId;
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      appointment.status = 'cancelled';
      await appointment.save();
      res.status(200).json(appointment);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
};


// Get appointments with pagination and optional search parameters
exports.getProducts = async (req, res) => {
  // works like search too
  try {
    const { page = 1, pageSize = 5, keyword, type, company } = req.query;
    const query = {};

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (type) {
      query.type = { $elemMatch: { $regex: type, $options: "i" } };
    }

    if (company) {
      const userQuery = {
        name: { $regex: company, $options: "i" },
        role: "company",
      };
      const users = await User.find(userQuery);
      console.log(users);
      const userId = users.map((user) => user._id);

      query.company = { $in: userId };
    }

    const products = await Product.find(query)
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize));

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / pageSize);

    res.status(200).json({
      products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAppointments = async (req, res) => {
    try {
        const { page = 1, pageSize = 5, date, status } = req.query;
        const user = req.user; // Assuming workshopID and customerID are available in req.user

        const query = {};

        // Add filter by date
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 1);
            query.date = { $gte: startDate, $lt: endDate };
        }

        // Add filter by status
        if (status) {
            query.status = status;
        }

        // Add filter by workshopID or customerID
        if (user.role == "workshop") {
            query.workshop = user._id;
        } else if (user.role == "workshop") {
            query.customer = user._id;
        }

        const appointments = await Appointment.find(query)
            .skip((page - 1) * pageSize)
            .limit(parseInt(pageSize))
            .sort({ date: 'asc' });

        const totalAppointments = await Appointment.countDocuments(query);
        const totalPages = Math.ceil(totalAppointments / pageSize);

        res.status(200).json({
            appointments,
            pagination: {
                totalAppointments,
                totalPages,
                currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};