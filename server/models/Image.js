const mongoose = require('mongoose');

// Schéma du modèle d'image
const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Modèle d'image
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;