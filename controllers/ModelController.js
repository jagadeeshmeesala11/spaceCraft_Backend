const Model = require('../models/ModelsModel');

exports.createModel = async (req, res) => {
  try {
    const { id, name, modelUrl, category, tags, thumbnailUrl } = req.body;

    const newModel = new Model({
      id,
      name,
      modelUrl,
      category,
      tags,
      thumbnailUrl
    });

    await newModel.save();

    res.status(201).json({ message: 'Model created successfully', newModel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating model', error });
  }
};

exports.getAllModels = async (req, res) => {
  try {
    const models = await Model.find();
    res.status(200).json(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching models', error });
  }
};

exports.getModelById = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.status(200).json(model);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching model', error });
  }
};

exports.updateModel = async (req, res) => {
  try {
    const { name, modelUrl, category, tags, thumbnailUrl } = req.body;
    const updatedModel = await Model.findByIdAndUpdate(
      req.params.id,
      { name, modelUrl, category, tags, thumbnailUrl },
      { new: true }
    );

    if (!updatedModel) {
      return res.status(404).json({ message: 'Model not found' });
    }

    res.status(200).json({ message: 'Model updated successfully', updatedModel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating model', error });
  }
};

exports.deleteModel = async (req, res) => {
  try {
    const deletedModel = await Model.findByIdAndDelete(req.params.id);

    if (!deletedModel) {
      return res.status(404).json({ message: 'Model not found' });
    }

    res.status(200).json({ message: 'Model deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting model', error });
  }
};
