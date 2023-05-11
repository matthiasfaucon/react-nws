import React, { useState } from 'react';
import axios from 'axios';

export default function ImageUpload() {
  const [image, setImage] = useState(null);

  function handleImageUpload(e) {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  }

  function uploadImage() {
    const formData = new FormData();
    formData.append('image', image);
    console.log(image);
    axios
      .post('http://localhost:5000/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        // redirection vers la page profil
        window.location = '/account';
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="wrapper">
      <div className="caca" style={{ width: 'auto' }}>
        Insérer votre fichier
        <input type="file" accept="file" name="file" onChange={(e) => handleImageUpload(e)} />
      </div>
      {image && <img src={URL.createObjectURL(image)} alt="image" style={{ width: 'auto', height: 'auto' }} />}
      <div>
        <button onClick={uploadImage} type="submit">Envoyer l'image</button>
      </div>
    </div>
  );
}
