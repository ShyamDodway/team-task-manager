const Task = require("../models/Task");
const Project = require("../models/Project");

exports.getDashboardStats = async (req, res) => {

  try {

    // Total tasks
    const totalTasks = await Task.countDocuments();

    // Completed tasks
    const completedTasks = await Task.countDocuments({
      status: "Completed"
    });

    // Pending tasks
    const pendingTasks = await Task.countDocuments({
      status: "Pending"
    });

    // In Progress tasks
    const inProgressTasks = await Task.countDocuments({
      status: "In Progress"
    });

    // Overdue tasks
    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "Completed" }
    });

    // Total projects
    const totalProjects = await Project.countDocuments();

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
      totalProjects
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};