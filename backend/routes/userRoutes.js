const express = require("express");

const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected profile data",
    user: req.user,
  });
});

module.exports = router;