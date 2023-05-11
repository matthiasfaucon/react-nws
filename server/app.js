const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

function generateAuthToken(userName) {
  const token = jwt.sign({ userName }, 'your_secret_key', { expiresIn: '1h' });
  return token;
}


// Configuration de Multer pour spécifier le dossier de destination des images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.access("./uploads", function(error) {
      if (error) {
        console.log("Directory does not exist.")
        fs.mkdirSync("./uploads")
      }
    });
    cb(null, 'uploads/'); // Dossier de destination des images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nom du fichier
  },
});

const upload = multer({ storage: storage });

// Création de l'application Express
const app = express();

// Configuration de la connexion à MongoDB
mongoose.connect('mongodb+srv://mfaucon:QTDTmpy6gMvrGhof@cluster0.lnne8yv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connexion à MongoDB établie');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB :', err);
  });

// Définition d'un modèle de données avec Mongoose
const Schema = mongoose.Schema;
const mySchema = new Schema({
  name: String,
  password: String,
});

const MyModel = mongoose.model('User', mySchema);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Configuration des routes
// Route pour ajouter un utilisateur
app.post('/api/users', (req, res) => {
  const { name, password } = req.body;  
  console.log(req.body);
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Crée une nouvelle instance du modèle MyModel
  const newUser = new MyModel({
    name: name,
    password: hashedPassword,
  });

  // Sauvegarde l'utilisateur dans la base de données
  newUser.save()
    .then(() => {
      res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
    })
    .catch((err) => {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
      res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
    });
});

app.post('/api/login', (req, res) => {

  
  const { name, password } = req.body;
  
  const token = generateAuthToken(name);

  // Recherche de l'utilisateur dans la base de données
  MyModel.findOne({ name: name })
    .then((user) => {
      if (user) {
        console.log(user);
        // Vérification du mot de passe haché
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (isPasswordValid) {
          // Authentification réussie
          
          res.json({ message: 'Connexion réussie', token: token});
        } else {
          // Mot de passe incorrect
          res.status(401).json({ error: 'Mot de passe incorrect' });
        }
      } else {
        // Utilisateur non trouvé
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la connexion' });
    });
});

const Image = require('./models/Image');

app.post('/api/images', upload.single('image'), (req, res) => {
  if (req.file) {
    // Le fichier a été téléchargé avec succès
    const imagePath = req.file.path;
    console.log(req.file);
    // Créer une nouvelle instance du modèle Image
    const newImage = new Image({
      name: req.file.originalname,
      size: req.file.size,
      url: imagePath
    });

    // Enregistrer l'image dans la base de données
    newImage.save()
      .then(() => {
        res.json({ message: 'Image ajoutée avec succès' });
      })
      .catch((error) => {
        console.error('Erreur lors de l\'enregistrement de l\'image :', error);
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'image' });
      });
  } else {
    // Aucun fichier n'a été téléchargé
    res.status(400).json({ error: 'Aucun fichier n\'a été téléchargé' });
  }
});

app.get('/api/images', (req, res) => {
  // Récupérer toutes les images de la base de données
  Image.find()
    .then((images) => {
      res.json(images);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des images :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des images' });
    });
});

// Démarrage du serveur
app.listen(5000);