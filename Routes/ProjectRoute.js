const express = require('express');
const router = express.Router();
const projectController = require('../controllers/ProjectControllers');
const  protect  = require('../Middleware/authMiddleware');

// Protected routes for project operations
router.post('/', protect, projectController.createProject);
router.get('/', protect, projectController.getAllProjects);
router.get('/:id', protect, projectController.getProjectById);
router.put('/:id', protect, projectController.updateProject);
router.delete('/:id', protect, projectController.deleteProject);

module.exports = router;
