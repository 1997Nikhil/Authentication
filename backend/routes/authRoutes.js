const express = require("express");

const {
  register,
  login,
} = require("../controllers/authController.js");

const router = express.Router(); // Create a new router instance to define routes related to authentication.

router.post("/register", register); // This line defines a POST route for user registration. When a POST request is made to /api/auth/register, the register function from authController.js will be called to handle the request.

router.post("/login", login); // This line defines a POST route for user login. When a POST request is made to /api/auth/login, the login function from authController.js will be called to handle the request.


module.exports = router;