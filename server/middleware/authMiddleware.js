const jwt = require('jsonwebtoken');

// Middleware d'authentification
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key'); // Remplacez 'secret_key' par votre clé secrète
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token invalide' });
  }
};

module.exports = authenticateJWT;