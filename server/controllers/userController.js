const User = require('../models/User');

// Fonction de contrôle pour l'inscription d'un utilisateur
async function register(req, res) {
  const { username, password, email } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    res.status(201).json({ user: savedUser });
    if (existingUser) {
      return res.status(400).json({ error: 'Nom d\'utilisateur déjà utilisé' });
    }

    // Créer un nouvel utilisateur
    const newUser = new User({ username, password, email });

    // Enregistrer l'utilisateur dans la base de données
    const savedUser = await newUser.save();

    res.status(201).json({ user: savedUser });
  } catch (error) {
    console.error('Erreur lors de l\'inscription de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
}

// Fonction de contrôle pour la connexion d'un utilisateur
async function login(req, res) {
  // Logique de connexion de l'utilisateur
  // À implémenter selon vos besoins spécifiques
}

// Fonction de contrôle pour la récupération du compte utilisateur
async function getAccount(req, res) {
  // Logique de récupération du compte utilisateur
  // À implémenter selon vos besoins spécifiques
}

module.exports = {
  register,
  login,
  getAccount,
};
