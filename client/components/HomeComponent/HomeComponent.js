import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function HomeComponent() {
    return (
        <div>
            <p>Bienvenue sur notre site d'upload d'images !</p>
            <Stack spacing={3} direction="row">
                <Link href="/login">
                    <Button variant="contained">Se connecter</Button>
                </Link>
                <Link href="/register">
                    <Button variant="outlined">S'inscrire</Button>
                </Link>
            </Stack>
        </div>
    );
}
