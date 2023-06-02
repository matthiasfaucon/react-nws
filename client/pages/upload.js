import Header from '../components/Header/HeaderComponent';
import UploadImage from '../components/UploadComponent/UploadComponent';
import { useEffect } from 'react';

export default function ImageUpload() {
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      window.location = '/login';
    }
  }, []);
  return (
    <>
    <Header />
    <UploadImage />
    </>
  );
}