const mongoose = require('mongoose');

const modelInstanceSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    required: true,
  },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true },
  },
  rotation: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    z: { type: Number, default: 0 },
  },
  scale: {
    x: { type: Number, default: 1 },
    y: { type: Number, default: 1 },
    z: { type: Number, default: 1 },
  },
}, { _id: false });

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    enum: ['living room', 'bedroom', 'kitchen', 'bathroom', 'office', 'custom'],
    default: 'custom',
  },
  layout: [modelInstanceSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
