const express = require("express");

const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {  // This line defines a GET route for fetching the user's profile. The authMiddleware is applied to this route, which means that the user must provide a valid JWT token in the Authorization header to access this route. If the token is valid, the request will proceed to the callback function; otherwise, an error response will be sent.
  res.json({
    message: "Protected profile data",
    user: req.user,
  });
});

module.exports = router;