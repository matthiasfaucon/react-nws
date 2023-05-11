import { useState } from 'react';
import axios from 'axios';
import Header from "../components/header";

export default function LoginPage() {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Envoie une requête POST à l'API pour ajouter l'utilisateur
      try {
        const res = await axios.post('http://localhost:5000/api/login', {
          name: name,
          password: password,
        });

        localStorage.setItem('authToken', res.data.token);
        // Redirection vers la page profil
        window.location = '/account';
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div>
      <Header></Header>
      <h1>Page de connexion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom d'utilisateur</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}