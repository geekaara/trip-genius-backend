// app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userDetailsRoutes = require("./routes/userDetailsRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");

// Initialize environment variables
dotenv.config();

// Create app instance
const app = express();
app.use(cors());
app.use(express.json()); // Body parser

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userDetailsRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
