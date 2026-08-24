const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email }); // This line queries the database to check if a user with the provided email already exists. If a user is found, it means that the email is already registered, and the function will return a 400 status code with an appropriate message.

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // The number 10 here is the salt rounds, which determines how secure the hash will be. A higher number means more security but also more processing time.

    // Create user
    const user = await User.create({    
      name,
      email,
      password: hashedPassword,
    });

    // Both are valid ways to create a new user in MongoDB using Mongoose. The first method (User.create) is more concise and is often preferred for its simplicity, while the second method (new User() followed by save()) provides more flexibility if you need to perform additional operations before saving the user.

    // const user = new User({ 
    //   name,
    //   email,
    //   password: hashedPassword,
    // });
    // await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    // Send token in response
    res.json({                        
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};