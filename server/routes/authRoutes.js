const express = require("express");
const router = express.Router();
const {
  userSignUp,
  userSignIn,
  userEmailVerification,
  whoAmI,
  userPasswordReset,
  userPasswordResetRequestEmail,
} = require("../controllers/authController");

//customer auth routes
router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.get("/verify-email", userEmailVerification);
router.post("/request-reset-password", userPasswordResetRequestEmail);
router.get("/reset-password", userPasswordReset);

module.exports = router;
