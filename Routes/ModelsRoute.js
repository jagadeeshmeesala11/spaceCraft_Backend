const express = require('express');
const router = express.Router();
const modelsController = require('../controllers/ModelController');

router.post('/', modelsController.createModel);
router.get('/', modelsController.getAllModels);
router.get('/:id', modelsController.getModelById);
router.put('/:id', modelsController.updateModel);
router.delete('/:id', modelsController.deleteModel);

module.exports = router;
