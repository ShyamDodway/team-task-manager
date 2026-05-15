const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask
} = require("../controllers/taskController");


// Create Task
router.post(
  "/",
  auth,
  role("Admin"),
  createTask
);


// Get Tasks
router.get(
  "/",
  auth,
  getTasks
);


// Update Status
router.put(
  "/:id/status",
  auth,
  updateTaskStatus
);


// Delete Task
router.delete(
  "/:id",
  auth,
  role("Admin"),
  deleteTask
);

module.exports = router;