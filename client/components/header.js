import React, { useState, useEffect } from 'react'; 
import Image from 'next/image'
import Link from 'next/link';

export default function Header() {
  const [isConnect, setIsConnect] = useState(false);
  useEffect(() => {
    setIsConnect(localStorage.getItem('authToken') ? true : false);
  })
  
  function disconnect() {
    localStorage.removeItem('authToken');
  }
  return (
    <div style={{display: 'flex', flexDirection: 'row-reverse', height: 100}}>
        {
         !isConnect ?
          <div style={{margin: 20}}><Link href="/login">Se connecter</Link></div>
          : 
          <div style={{margin: 20}} onClick={disconnect}><Link href="/login">Se déconnecter</Link></div>
        }
        <div style={{margin: 20}} className="link"><Link href="/upload">Upload</Link></div>
        <div style={{margin: 20}} className="link"><Link href="/account">Mon profil</Link></div>
    </div>
  )
}