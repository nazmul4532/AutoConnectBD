const express = require('express');
const router = express.Router();
const { customerSignUp, customerSignIn, customerEmailVerification } = require('../controllers/authController');

router.post('/customer/signup', customerSignUp);
router.post('/customer/signin', customerSignIn);
router.get('/customer/verify-email', customerEmailVerification);

module.exports = router;
