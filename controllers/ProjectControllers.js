const Project = require('../models/ProjectModel');

exports.createProject = async (req, res) => {
  try {
    const { name, roomType, layout } = req.body;

    const project = new Project({
      user: req.user._id,
      name,
      roomType,
      layout,
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).select('-__v').sort('-createdAt');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.user._id })
      .populate('layout.model')
      .select('-__v');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch project', error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, roomType, layout } = req.body;

    const updatedProject = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, roomType, layout },
      { new: true, runValidators: true }
    ).populate('layout.model');

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found or not authorized' });
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found or not authorized' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
};
