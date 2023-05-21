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
import { ButtonBase } from "@mui/material";

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
        const response = await axios.get(serverAdress + "images/" + userIdFromCookie);
        setPictures(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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

  function updateOnePicture(imageId, isPublic) {
    return async () => {
      try {
        const updatedIsPublic = !isPublic;
        await axios.put(`http://localhost:5000/api/images/${imageId}`, { isPublic: updatedIsPublic });
        setPictures((prevPictures) => {
          return prevPictures.map((picture) => {
            if (picture._id === imageId) {
              return { ...picture, isPublic: updatedIsPublic };
            }
            return picture;
          });
        });
      } catch (error) {
        console.error(error);
      }
    };
  }

  function disconnect() {
    localStorage.removeItem('authToken');
    window.location = '/';
  }

  function deleteAccount() {
    return async () => {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        localStorage.removeItem('authToken');
        window.location = '/';
      } catch (error) {
        console.error(error);
      }
    };
  }

  return (
    <div>
      <Header />
      <ButtonBase onClick={deleteAccount()} sx={{ color: 'white', backgroundColor: 'red', padding: '1rem', borderRadius: '5px', margin: '1rem' }}>
        Supprimer votre compte
      </ButtonBase>
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
                    <div style={{ color: 'white' }}>
                      Confidentiel
                    </div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={!picture.isPublic}
                            onChange={updateOnePicture(picture._id, picture.isPublic)}
                          />
                        }
                      />
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
