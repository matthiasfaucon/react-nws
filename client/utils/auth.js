import Cookies from 'js-cookie';

// Définition du nom du cookie
const COOKIE_NAME = 'userId';

// Sauvegarder le nom d'utilisateur dans un cookie
export const saveUserIdToCookie = (userId) => {
  Cookies.set(COOKIE_NAME, userId);
};

// Récupérer le nom d'utilisateur depuis le cookie
export const getUserIdFromCookie = () => {
  return Cookies.get(COOKIE_NAME);
};

// Supprimer le cookie contenant le nom d'utilisateur
export const removeUserIdFromCookie = () => {
  Cookies.remove(COOKIE_NAME);
};
