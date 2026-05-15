const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {
  getDashboardStats
} = require("../controllers/dashboardController");


// Dashboard Stats
router.get(
  "/stats",
  auth,
  getDashboardStats
);

module.exports = router;