const express = require('express');
const upload = require('../configs/multerConfig'); // Import the Multer configuration

const app = express();

app.post('/upload', upload.single('image'), function (req, res, next) {
  // Handle the uploaded file here
  res.send('File uploaded successfully');
});

module.exports = app;
