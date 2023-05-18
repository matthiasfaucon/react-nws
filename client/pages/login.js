import { useState } from 'react';
import axios from 'axios';
import Header from "../components/Header/HeaderComponent";
import LoginComponent from '../components/LoginComponent/LoginComponent';

export default function LoginPage() {
  
  return (
    <>
      <Header />
      <LoginComponent />
    </>
  );
}