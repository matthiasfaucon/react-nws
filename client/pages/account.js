import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


export default function AccountPage() {
    
    const [pictures, setPictures] = useState([]);
    
    useEffect(() => {
      if (!localStorage.getItem('authToken')) {
        window.location = '/login';
      }
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/images");
        setPictures(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, []);

  function disconnect() {
    localStorage.removeItem('authToken');
    window.location = '/';
  }

  return (
    <div>
      <Header></Header>
      <h1>Page profil</h1>
      <button onClick={disconnect}>Se déconnecter</button>
      <h2>Images</h2>
      <ImageList>
        {pictures.map((picture) => (
          <ImageListItem key={picture._id}>
            <div style={{ height: '200px' }}>
              <img
                src={`http://localhost:5000/${picture.url}`}
                alt={picture.name}
                loading="lazy"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
            </div>
            <ImageListItemBar
              title={picture.name}
              subtitle={picture.size}
              />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
