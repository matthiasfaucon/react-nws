import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { serverAdress } from '../services/utils';
import { getUserIdFromCookie } from '../utils/auth';

const StyledContainer = styled(Grid)`
  padding: 24px;
  text-align: center;
`;

const StyledImageContainer = styled(Grid)`
  margin-top: 16px;
`;

const StyledImage = styled('img')`
  width: 200px;
  height: 200px;
`;

export default function ImageUpload() {
  const [images, setImages] = useState(null);

  function handleImageUpload(e) {
    const selectedImages = [...e.target.files];
    setImages(selectedImages);
  }

  function uploadImage() {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image`, image);
    });

    const userId = getUserIdFromCookie();

    // Ajoutez d'autres données si nécessaire
    formData.append('userId', userId);

    axios
      .post(serverAdress + 'images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        // Redirection vers la page profil
        window.location = '/account';
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <StyledContainer container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <input
          type="file"
          accept="file"
          multiple
          name="image"
          onChange={(e) => handleImageUpload(e)}
          style={{ display: 'none' }}
          id="image-upload-input"
        />
        <label htmlFor="image-upload-input">
          <Button variant="contained" color="primary" component="span">
            Insérer votre fichier
          </Button>
        </label>
      </Grid>
      {images && (
        <>
          <Typography variant="h6">Aperçu des images sélectionnées :</Typography>
          <StyledImageContainer item container spacing={2}>
            {images.map((image, index) => (
              <Grid item key={index}>
                <StyledImage src={URL.createObjectURL(image)} alt="image" />
              </Grid>
            ))}
          </StyledImageContainer>
        </>
      )}
      <Grid item>
        <Button variant="contained" color="primary" onClick={uploadImage}>
          Envoyer l'image
        </Button>
      </Grid>
    </StyledContainer>
  );
}