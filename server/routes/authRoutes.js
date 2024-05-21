const express = require('express');
const router = express.Router();
const { customerSignUp, customerSignIn, customerEmailVerification, workshopSignUp, workshopSignIn, workshopEmailVerification } = require('../controllers/authController');

//customer auth routes
router.post('/customer/signup', customerSignUp);
router.post('/customer/signin', customerSignIn);
router.get('/customer/verify-email', customerEmailVerification);

//workshop auth routes
router.post('/workshop/signup', workshopSignUp);
router.post('/workshop/signin', workshopSignIn);
router.get('/workshop/verify-email', workshopEmailVerification);

module.exports = router;
