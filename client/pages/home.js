import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';
import FormGroup from '@mui/material/FormGroup';

import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header/HeaderComponent';
import HomeComponent from '../components/HomeComponent/HomeComponent';
import { serverAdress } from '../services/utils';

export default function HomePage() {
  
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      window.location = '/login';
    }
  const fetchData = async () => {
    try {
      const response = await axios.get(serverAdress + 'images');
      setPictures(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  fetchData();
}, []);

  return (
    <>
      <Header />
      {/* <HomeComponent /> */}
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

          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
