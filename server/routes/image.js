const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// Route pour l'upload d'une image
router.post('/', uploadMiddleware.single('image'), imageController.uploadImage);

// Route pour récupérer toutes les images
router.get('/', imageController.getAllImages);

module.exports = router;