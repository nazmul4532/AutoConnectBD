const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const {
  verifyToken,
  isCustomer,
  isCustomerOrWorkshop,
} = require("../middleware/authMiddleware");

// Add an appointment
router.post(
  "/add",
  verifyToken,
  isCustomer,
  appointmentController.addAppointment
);

// Update an appointment
router.patch(
  "/update/:appointmentId",
  verifyToken,
  isCustomerOrWorkshop,
  appointmentController.updateAppointment
);

router.get(
  "/workshop_busy_slots/:workshopId",
  verifyToken,
  isCustomer,
  appointmentController.getWorkshopBusySlots
);

// Cancel an appointment
router.patch(
  "/cancel/:appointmentId",
  verifyToken,
  isCustomerOrWorkshop,
  appointmentController.cancelAppointment
);

// Get appointments with pagination and optional search parameters
router.get("/", appointmentController.getAppointments);

module.exports = router;
