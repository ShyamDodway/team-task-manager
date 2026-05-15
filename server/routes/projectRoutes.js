const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createProject,
  getProjects,
  addMember
} = require("../controllers/projectController");

router.post(
  "/",
  auth,
  role("Admin"),
  createProject
);

router.get(
  "/",
  auth,
  getProjects
);

router.put(
  "/:id/add-member",
  auth,
  role("Admin"),
  addMember
);

module.exports = router;
