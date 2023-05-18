import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header/HeaderComponent';
import { serverAdress } from '../services/utils';
import RegisterComponent from '../components/Register/RegisterComponent';

export default function AddUser() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Envoie une requête POST à l'API pour ajouter l'utilisateur
    try {
      const res = await axios.post(serverAdress + 'users', {
        name: name,
        password: password,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
    return (
      <div>
        <Header />
        <RegisterComponent />
      </div>
    );
}
