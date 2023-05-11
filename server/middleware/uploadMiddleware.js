const multer = require('multer');

// Configuration de multer pour l'upload des fichiers d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images'); // Spécifiez le dossier de destination où les images seront stockées
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
  }
});

const upload = multer({ storage });

module.exports = upload;