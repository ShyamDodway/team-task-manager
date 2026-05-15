const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

// Admin only route
router.get(
  "/dashboard",
  auth,
  role("Admin"),
  (req, res) => {

    res.json({
      message: "Welcome Admin"
    });

  }
);

module.exports = router;