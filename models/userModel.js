// models/userModel.js
const pool = require("../config/db");
const bcrypt = require("bcryptjs");

// Create a user and store the hashed password
const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with salt rounds
  const query =
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
  const values = [email, hashedPassword];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the created user
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
};

// Find user by email
const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // If found, return user, else undefined
  } catch (err) {
    throw new Error("Error finding user: " + err.message);
  }
};

module.exports = { createUser, findUserByEmail };
