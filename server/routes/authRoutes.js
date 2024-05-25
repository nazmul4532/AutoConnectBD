const express = require("express");
const router = express.Router();
const {
  userSignUp,
  userSignIn,
  userEmailVerification,
  whoAmI
} = require("../controllers/authController");


//customer auth routes
router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.get("/verify-email", userEmailVerification);

module.exports = router;
