const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const uploadMiddleware = require('./middleware/uploadMiddleware');
const configureCloudinary = require('./configs/cloudinaryConfig');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(uploadMiddleware);
configureCloudinary();

// Middleware to parse JSON bodies
app.use(express.json());


// // Route middleware
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
// app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
