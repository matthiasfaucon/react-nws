import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function HomeComponent() {
    return (
        <div>
            <p>Bienvenue sur notre site d&apos;upload d&apos;images !</p>
            <Stack spacing={3} direction="row">
                <Link href="/login">
                    <Button variant="contained">Se connecter</Button>
                </Link>
                <Link href="/register">
                    <Button variant="outlined">S&apos;inscrire</Button>
                </Link>
            </Stack>
        </div>
    );
}
