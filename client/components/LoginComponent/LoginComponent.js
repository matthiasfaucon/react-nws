import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { removeUserIdFromCookie, saveUserIdToCookie } from '../../utils/auth';
import { FormControl, OutlinedInput, Button, TextField, Alert } from '@mui/material';
import { serverAdress } from '../../services/utils';

export default function LoginComponent() {
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(serverAdress + 'login', {
        name: data.username,
        password: data.password,
      });

      localStorage.setItem('authToken', res.data.token);
      removeUserIdFromCookie();
      saveUserIdToCookie(res.data.userId);
      window.location = '/account'; // Redirect to profile page
    } catch (err) {
      console.error(err);
      setError('Nom d\'utilisateur ou mot de passe incorrect'); // Set error message
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
        {error && <Alert severity="error">{error}</Alert>} {/* Display error message */}
        <FormControl sx={{ width: '25ch' }}>
          <OutlinedInput
            placeholder="Nom d'utilisateur"
            {...register('username', { required: true, maxLength: 80 })}
          />
        </FormControl>
        {errors.username && <Alert severity="error">Le nom d&apos;utilisateur est requis.</Alert>}

        <FormControl sx={{ width: '25ch' }}>
          <TextField
            type="password"
            placeholder="Mot de passe"
            {...register('password', { required: true, maxLength: 80 })}
          />
        </FormControl>
        {errors.password && <Alert severity="error">Le mot de passe est requis.</Alert>}

        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}