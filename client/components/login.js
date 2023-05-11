import Image from 'next/image'
import Header from '../components/header'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function Login() {

    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupName, setSignupName] = useState('');
    const [signupPassword, setSignupPassword] = useState('');


    return (
        <main>
            <Header />
            <Container maxWidth="md">
                <Grid container spacing={12}>
                    <Grid item xs={6}>
                        <h2 style={{ marginBottom: 20 }}>Se connecter</h2>
                        <TextField
                            style={{ marginBottom: 20 }}
                            type="email"
                            value={loginName}
                            size="small"
                            onChange={(e) => setLoginName(e.target.value)}
                            label="Nom de compte"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            value={loginPassword}
                            type="password"
                            size="small"
                            onChange={(e) => setLoginPassword(e.target.value)}
                            label="Mot de passe"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <h2 style={{ marginBottom: 20 }}>Créer un compte</h2>
                        <TextField
                            style={{ marginBottom: 20 }}
                            type="email"
                            value={signupName}
                            size="small"
                            onChange={(e) => setSignupName(e.target.value)}
                            label="Nom de compte"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            value={signupPassword}
                            type="password"
                            size="small"
                            onChange={(e) => setSignupPassword(e.target.value)}
                            label="Mot de passe"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                </Grid>
                {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} /> */}
            </Container>
        </main>
    )
}
