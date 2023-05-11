import { useState } from 'react';
import axios from 'axios';

export default function AddUser() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Envoie une requête POST à l'API pour ajouter l'utilisateur
    try {
      const res = await axios.post('http://localhost:5000/api/users', {
        name: name,
        password: password,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Ajouter l'utilisateur</button>
      </form>
    );
}
