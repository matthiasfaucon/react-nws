
// Contrôleur pour l'upload d'une image
exports.uploadImage = async (req, res) => {
  try {
    const { filename, originalname, size } = req.file;
    const { title, description } = req.body;

    // Créer une nouvelle instance de l'image
    const newImage = new Image({
      filename,
      originalname,
      size,
      title,
      description,
    });

    // Enregistrer l'image dans la base de données
    const savedImage = await newImage.save();

    res.status(201).json(savedImage);
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'upload de l\'image' });
  }
};

// Contrôleur pour récupérer toutes les images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error('Erreur lors de la récupération des images :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des images' });
  }
};
const Image = require('../models/Image');

// Contrôleur pour l'upload d'une image
exports.uploadImage = async (req, res) => {
  try {
    const { filename, originalname, size } = req.file;
    const { title, description } = req.body;

    // Créer une nouvelle instance de l'image
    const newImage = new Image({
      filename,
      originalname,
      size,
      title,
      description,
    });

    // Enregistrer l'image dans la base de données
    const savedImage = await newImage.save();

    res.status(201).json(savedImage);
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'upload de l\'image' });
  }
};

// Contrôleur pour récupérer toutes les images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error('Erreur lors de la récupération des images :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des images' });
  }
};
