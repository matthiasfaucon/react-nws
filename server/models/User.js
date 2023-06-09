const mongoose = require('mongoose');

// Schéma du modèle d'utilisateur
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // images: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Image'
  // }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Modèle d'utilisateur
const User = mongoose.model('User', userSchema);

module.exports = User;