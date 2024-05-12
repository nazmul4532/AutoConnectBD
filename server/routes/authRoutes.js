const express = require('express');
const router = express.Router();
const { customerSignUp, customerSignIn } = require('../controllers/authController');

router.post('/customer/signup', customerSignUp);
router.post('/customer/signin', customerSignIn);

module.exports = router;
