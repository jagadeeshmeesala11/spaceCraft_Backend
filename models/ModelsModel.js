const mongoose = require('mongoose');

// Define the schema for 3D models
const modelSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  modelUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  thumbnailUrl: {
    type: String,
    default: null 
  }
});


const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
