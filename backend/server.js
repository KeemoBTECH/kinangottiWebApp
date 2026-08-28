const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notices", require("./routes/notices"));
app.use("/api/events", require("./routes/events"));
app.use("/api/applications", require("./routes/applications"));

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Kinango TVC API is running successfully",
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// IMPORTANT:
// Do NOT use app.listen() on Vercel

module.exports = app;
