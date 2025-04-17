const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name:{type: String, required: true},
    width:{type: Number, required: true},
    height:{type: Number, required: true},
    depth:{type: Number, required: true},
    description:{type: String, required: true},
    owner:{type: String, required: true},
 }, {timestamps: true});

 module.exports = mongoose.model('Room', roomSchema);