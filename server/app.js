const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;

const Image = require('./models/Image');
const User = require('./models/User');

function generateAuthToken(userId) {
  const token = jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });
  console.log(token);
  return token;
}

// Configuration de Multer pour spécifier le dossier de destination des images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.access("./uploads", function (error) {
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

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuration des routes
// Route pour ajouter un utilisateur
app.post('/api/users', (req, res) => {
  const { name, password } = req.body;
  // console.log(req.body);
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Crée une nouvelle instance du modèle User
  const newUser = new User({
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

app.delete('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  User.deleteOne({ _id: userId })
    .then(() => {
      Image.deleteMany({ user: userId })
        .then(() => {
          console.log("Images supprimées");
        })
        .catch((err) => {
          console.error('Erreur lors de la suppression des images :', err);
          res.status(500).json({ error: 'Erreur lors de la suppression des images' });
        });
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    })
    .catch((err) => {
      console.error('Erreur lors de la suppression de l\'utilisateur :', err);
      res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    });
});

app.post('/api/register', (req, res) => {
  const { name, password } = req.body;
  // console.log(req.body);
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  // Crée une nouvelle instance du modèle User
  const newUser = new User({
    name: name,
    password: hashedPassword,
  });

  // Sauvegarde l'utilisateur dans la base de données
  newUser.save()
    .then(() => {
      res.status(201).json({ message: 'Utilisateur ajouté avec succès', userId: newUser.id });
    })
    .catch((err) => {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
      res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
    });
});

app.post('/api/login', (req, res) => {

  const { name, password } = req.body;

  // Recherche de l'utilisateur dans la base de données
  User.findOne({ name: name })
    .then((user) => {
      if (user) {
        const token = generateAuthToken(user.id);
        // Vérification du mot de passe haché
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (isPasswordValid) {
          // Authentification réussie

          res.json({ message: 'Connexion réussie', token: token, userId: user.id });
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

app.post('/api/images', upload.array('image', 10), (req, res) => {
  if (req.files && req.files.length > 0) {
    console.log(req.body);
    const userId = req.body.userId;
    // const userIdObjectId = new ObjectId(userId);
    console.log(userId);
    User.findOne({ _id: userId })
      .then((user) => {
        if (!user) {
          console.log("Utilisateur non trouvé");
          res.status(404).json({ error: 'Utilisateur non trouvé' });
        } else {
          const userId = user._id;
          console.log(userId);
          const images = req.files.map((file) => {
            return {
              name: file.originalname,
              size: file.size,
              url: file.path,
              isPublic: false,
              user: userId
            };
          });

          Image.insertMany(images)
            .then(() => {
              res.status(200).json({ message: 'Images ajoutées avec succès' });
            })
            .catch((error) => {
              console.error('Erreur lors de l\'ajout des images :', error);
              res.status(500).json({ error: 'Erreur lors de l\'ajout des images' });
            });
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la recherche de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la recherche de l\'utilisateur' });
      });
  } else {
    res.status(400).json({ error: 'Aucune image à ajouter' });
  }
});


app.get('/api/images', (req, res) => {
  // Récupérer toutes les images de la base de données
  Image.find({ isPublic: true})
    .then((images) => {
      res.json(images);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des images :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des images' });
    });
});


app.get('/api/images/:userId', (req, res) => {
  const userId = req.params.userId;
  const userObjectId = new ObjectId(userId); // Récupérer l'ID de l'utilisateur depuis la requête
  // Vérifier si l'ID de l'utilisateur est fourni
  if (!userId) {
    res.status(400).json({ error: 'ID de l\'utilisateur manquant' });
    return;
  }

  // Récupérer les images associées à l'utilisateur spécifié
  Image.find({ user: userObjectId })
    .then((images) => {
      res.json(images);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des images :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des images' });
    });
});


// Route pour supprimer une image d'un utilisateur spécifique
app.delete('/api/users/:userId/images/:imageId', (req, res) => {
  const userId = req.params.userId;
  const imageId = req.params.imageId;

  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      // Suppression de l'image du tableau images de l'utilisateur

      // Enregistrement des modifications dans la base de données
      user.save()
        .then(() => {
          // Suppression de l'image de la base de données
          Image.findOneAndDelete({ _id: imageId })
            .then((image) => {
              if (!image) {
                return res.status(404).json({ error: 'Image non trouvée' });
              }

              // Suppression du fichier d'image du système de fichiers
              fs.unlink(image.url, (err) => {
                if (err) {
                  console.error('Erreur lors de la suppression du fichier d\'image :', err);
                }
              });

              res.status(200).json({ message: 'Image supprimée avec succès' });
            })
            .catch((error) => {
              console.error('Erreur lors de la suppression de l\'image :', error);
              res.status(500).json({ error: 'Erreur lors de la suppression de l\'image' });
            });
        })
        .catch((error) => {
          console.error('Erreur lors de l\'enregistrement des modifications de l\'utilisateur :', error);
          res.status(500).json({ error: 'Erreur lors de la suppression de l\'image' });
        });
    })
    .catch((error) => {
      console.error('Erreur lors de la recherche de l\'utilisateur :', error);
      res.status(500).json({ error: 'Erreur lors de la recherche de l\'utilisateur' });
    });
});

app.put('/api/images/:imageId', (req, res) => {
  const imageId = req.params.imageId;
  const isPublic = req.body.isPublic;
console.log(isPublic);
  Image.findOneAndUpdate({ _id: imageId }, { isPublic: isPublic })
    .then((image) => {
      image.isPublic = isPublic;
      image.save()
      return res.status(200).json({ message: 'Image modifiée avec succès' });
    });
});

// Update une image
app.put('/api/users/:userId/images/:imageId', (req, res) => {
  const userId = req.params.userId;
  const imageId = req.params.imageId;
  const isPublic = req.body.isPublic;

  Image.findOneAndUpdate({ _id: imageId }, { user: userId })
    .then((image) => {
      image.isPublic = isPublic;
      image.save()
    });
});

// Démarrage du serveur
app.listen(5000);