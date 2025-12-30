const express = require("express");
const connectDB = require("./config/db"); // your custom DB connection
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB(); // Make sure this handles mongoose.connect internally

// Test route
app.get("/", (req, res) => {
  res.send("LMS Backend Running 🚀");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/student", require("./routes/student"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
