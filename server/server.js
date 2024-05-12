const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());



// Middleware to parse JSON bodies
app.use(express.json());

// // Import and use your routes
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const workshopRoutes = require('./routes/workshopRoutes');
const fuelingStationRoutes = require('./routes/fuelingStationRoutes');
// const appointmentRoutes = require('./routes/appointmentRoutes');

// // Route middleware
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
// app.use('/api/workshops', workshopRoutes);
// app.use('/api/fueling-stations', fuelingStationRoutes);
// app.use('/api/appointments', appointmentRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
// app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
