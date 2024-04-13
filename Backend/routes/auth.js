const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const userModel = require("../models/user");

/**
 * Validates the complexity of a password.
 *
 * This function checks if a given password meets the following criteria:
 * - At least 8 characters long.
 * - Contains at least one uppercase letter.
 * - Contains at least one lowercase letter.
 * - Contains at least one digit.
 * - Contains at least one special character from the set [@$!%*?&].
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns `true` if the password meets all the criteria, otherwise `false`.
 *
 * @example
 * const isValid = passwordValidater('Password123!');
 * console.log(isValid); // true
 *
 * @example
 * const isValid = passwordValidater('password');
 * console.log(isValid); // false
 */
const passwordValidater = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

/**
 * Register a new user.
 *
 * This route handles user registration. It validates the request body for required fields
 * (username, email, password), checks if the password meets the complexity requirements,
 * and ensures that no user already exists with the provided email. If all checks pass,
 * it hashes the password, creates a new user in the database.
 *
 * @route POST /register
 * @group Authentication - Operations about user authentication
 * @param {string} username.body.required - The username of the new user.
 * @param {string} email.body.required - The email of the new user.
 * @param {string} password.body.required - The password of the new user.
 * @returns {object} 201 - Successfully registered a new user. Returns the user's details and a JWT token.
 * @returns {object} 400 - Missing required fields or password does not meet complexity requirements.
 * @returns {object} 409 - A user already exists with the given email ID.
 * @returns {object} 500 - Internal server error.
 */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for required fields
    if (!username) {
      res.status(400).json({ message: "Username Required" });
      return;
    }
    if (!email) {
      res.status(400).json({ message: "Email Required" });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "Password Required" });
      return;
    }

    // Validate password complexity
    if (!passwordValidater(password)) {
      res.status(400).json({
        message:
          "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character",
      });
      return;
    }

    // Check if user already exists
    let user = await userModel.findOne({ email: email });
    if (user) {
      res
        .status(409)
        .json({ message: "User already exists with given email Id" });
      return;
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new userModel({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await userData.save();

    // Generate and return JWT token
    const token = jwt.sign(
      { userId: userData._id, username: username, email: email },
      process.env.SECERT_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("AuthToken", token, { maxAge: 600000000, httpOnly: true });

    res.status(201).json({
      userId: userData._id,
      username: userData.username,
      email: userData.email,
    });
  } catch (err) {
    // Handle any errors that occur during the registration process
    res.status(500).json({
      message: "Unable to register user",
      error: err,
    });
  }
});

/**
 * Authenticate a user and return a JWT token.
 *
 * This route handles user authentication. It validates the request body for required fields
 * (email and password), checks if the user exists in the database, and verifies the password.
 * If the user is authenticated successfully, it returns the user's details.
 *
 * @route POST /login
 * @group Authentication - Operations about user authentication
 * @param {string} email.body.required - The email of the user.
 * @param {string} password.body.required - The password of the user.
 * @returns {object} 400 - Missing required fields (email or password).
 * @returns {object} 401 - User not found or authentication failed (wrong password).
 * @returns {object} 200 - Successfully authenticated. Returns the user's details and a JWT token.
 * @returns {object} 500 - Internal server error.
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for required fields
    if (!email) {
      return res.status(400).json({ message: "Email Required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password Required" });
    }

    // Find user by email
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    // Verify password
    const encryptedPassword = await bcrypt.compare(password, user.password);
    if (!encryptedPassword) {
      return res
        .status(401)
        .json({ message: "Authentication failed: Wrong Password" });
    }

    // Generate and return JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: email },
      process.env.SECERT_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("AuthToken", token, { maxAge: 600000000, httpOnly: true });
    console.log("login token: ", token)
    
    res.status(200).json({
      userId: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    // Handle any errors that occur during the authentication process
    return res.status(500).json({
      message: "Unable to authenticate user",
      error: err,
    });
  }
});

module.exports = router;
