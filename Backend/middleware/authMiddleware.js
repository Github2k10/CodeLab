/**
 * Middleware to verify JWT token.
 *
 * This middleware function is used to verify the JWT token provided in the request header.
 * It checks if the token exists and is valid. If the token is valid, it decodes the token,
 * attaches the decoded user information to the request object, and calls the next middleware
 * in the stack. If the token is missing or invalid, it sends an appropriate error response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 *
 * @returns {void} - If the token is valid, it calls the next middleware.
 * @returns {Object} 401 - If the token is missing or invalid, it sends an error response.
 */
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Extract the token from the AuthorizationToken header
    console.log(req.cookies);
    const token = req.cookies.AuthToken;

    // If no token is provided, send a 401 Unauthorized response
    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }

    // Verify the token and decode it
    const decode = jwt.verify(token, process.env.SECERT_KEY);

    // Attach the decoded user information to the request object
    req.userId = decode.userId;
    req.username = decode.username;
    req.email = decode.email;

    // Proceed to the next middleware
    next();
  } catch (err) {
    // If the token is invalid, send a 401 Unauthorized response
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
