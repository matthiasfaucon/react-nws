import Head from 'next/head';
import Link from 'next/link';

export default function IndexPage() {
  return (
    <div>
      <Head>
        <title>Accueil</title>
      </Head>
      <h1>Page d'accueil</h1>
      <p>Bienvenue sur notre site d'upload d'images !</p>
      <Link href="/login">
        Se connecter
      </Link>
      <Link href="/register">
        S'inscrire
      </Link>
    </div>
  );
}
