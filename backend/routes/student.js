const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// GET student dashboard data
router.get("/dashboard", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      enrolledCourses: user.enrolledCourses.length || 0,
      learningHours: user.learningHours || 0,
      completed: user.completed || 0,
      certificates: user.certificates || [],
      courses: user.enrolledCourses || [],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
