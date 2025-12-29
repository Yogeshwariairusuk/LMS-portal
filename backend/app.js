const express = require("express");
const connectDB = require("./config/db");


const app = express();

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("LMS Backend Running 🚀");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/student", require("./routes/student"));

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} 🚀`)
);
