import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header/HeaderComponent";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from "@mui/material/colors";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { getUserIdFromCookie } from "../utils/auth";
import { serverAdress } from "../services/utils";


export default function AccountPage() {
    
    const [pictures, setPictures] = useState([]);
    const [userId, setUserId] = useState('');
    
    useEffect(() => {
      if (!localStorage.getItem('authToken')) {
        window.location = '/login';
      }
    
      const fetchData = async () => {
        try {
          const userIdFromCookie = getUserIdFromCookie();
          setUserId(userIdFromCookie);
          console.log(userIdFromCookie);
          const response = await axios.get(serverAdress + "images/" + userIdFromCookie);
          setPictures(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, []);
    
    // Si tu enlève ça le userId est undefined et du coup tu ne rentre pas dans la route API
    useEffect(() => {
      // Effectuez les opérations nécessaires une fois que `userId` a été mis à jour
      if (userId !== '') {
        // Vous pouvez placer ici le code qui utilise `userId`
        console.log(userId);
      }
    }, [userId]);
    

  function deleteOnePicture(userId, imageId) {
    return async () => {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}/images/${imageId}`);
        setPictures(pictures.filter((picture) => picture._id !== imageId));
      } catch (error) {
        console.error(error);
      }
    };
  }

  function updateOnePicture(userId, imageId, isPublic) {
    return async () => {
      try {
        await axios.put(`http://localhost:5000/api/users/${userId}/images/${imageId}`, { isPublic: !isPublic});
        setPictures(pictures.filter((picture) => picture._id !== imageId));
      } catch (error) {
        console.error(error);
      }
    };
  }

  function disconnect() {
    localStorage.removeItem('authToken');
    window.location = '/';
  }

  return (
    <div>
      <Header />
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
              actionIcon={
                <div style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
                  <IconButton>
                    <DeleteForeverIcon onClick={deleteOnePicture(userId, picture._id)} sx={{ color: red[500] }} />
                  </IconButton>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '8px' }}>
                    <div style={{ color: 'white'}}>
                      Confidentiel
                    </div>
                    <FormGroup>
                      <FormControlLabel control={<Switch defaultChecked />} onClick={updateOnePicture(userId, picture._id, picture.isPublic)}/>
                    </FormGroup>
                  </div>
                </div>
              }
              style={{ opacity: 1 }}

            />

          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
