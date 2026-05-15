const Project = require("../models/Project");


// Create Project
exports.createProject = async (req, res) => {

  try {

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user.id
    });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Get All Projects
exports.getProjects = async (req, res) => {

  try {

    const projects = await Project.find()
      .populate("createdBy", "name email role")
      .populate("members", "name email role");

    res.json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Add Member
exports.addMember = async (req, res) => {

  try {

    const { userId } = req.body;

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    project.members.push(userId);

    await project.save();

    res.json({
      message: "Member added",
      project
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};