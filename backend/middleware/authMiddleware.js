const jwt = require("jsonwebtoken");

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;    // This line retrieves the Authorization header from the incoming request. The Authorization header is expected to contain a Bearer token, which is a type of access token used for authentication. The format of the header should be "Bearer <token>", where <token> is the JWT that was issued to the user upon successful login.

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing",
      });
    }

    const decoded = jwt.verify(    // This line uses the jwt.verify() function to decode and verify the JWT token. The function takes two arguments: the token itself and the secret key used to sign the token. If the token is valid and has not expired, it will return the decoded payload (which contains user information). If the token is invalid or expired, it will throw an error, which is caught in the catch block below.
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;   // This line attaches the decoded payload (which contains user information) to the req.user property. This allows subsequent middleware functions or route handlers to access the authenticated user's information, such as their user ID and email, without needing to decode the token again.

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;