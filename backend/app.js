const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // This line mounts the authRoutes on the /api/auth path, so any requests to /api/auth/register or /api/auth/login will be handled by the corresponding controller functions defined in authController.js.
app.use("/api/user", userRoutes); // This line mounts the userRoutes on the /api/user path, so any requests to /api/user/profile or /api/user/update will be handled by the corresponding controller functions defined in userController.js.

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });